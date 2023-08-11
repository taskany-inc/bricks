import React, { useEffect } from 'react';
import styled from 'styled-components';
import { backgroundColor, danger0, gapM, gapS, gray4, radiusM, warn0 } from '@taskany/colors';

import { useKeyboard, KeyCode } from '../hooks/useKeyboard';

import { Portal } from './Portal';
import { CrossIcon } from './Icon';

type ModalViewType = 'default' | 'warn' | 'danger';

const colorsMap: Record<ModalViewType, string> = {
    default: 'transparent',
    warn: warn0,
    danger: danger0,
};

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    visible?: boolean;
    width?: number;
    view?: ModalViewType;

    onClose?: () => void;
    onShow?: () => void;
}

const StyledModalSurface = styled.div`
    position: fixed;
    z-index: 101;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;

    background-color: rgba(0, 0, 0, 0.9);
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledModal = styled(({ width, view, ...props }: ModalProps) => <div {...props} />)`
    box-sizing: border-box;
    position: absolute;
    z-index: 101;

    min-width: 300px;
    min-height: 200px;
    max-height: 90%;

    border-radius: ${radiusM};

    background-color: ${backgroundColor};

    border: 1px solid ${({ view = 'default' }) => colorsMap[view]};
    width: ${({ width }) => width}px;
`;

const StyledCross = styled.div`
    position: absolute;
    z-index: 102;
    right: ${gapM};
    top: ${gapM};

    width: 20px;
    height: 20px;

    opacity: 0.6;

    cursor: pointer;

    text-align: center;

    &:hover {
        opacity: 1;
        transition: opacity 200ms ease-in-out;
    }
`;

interface ModalCrossProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;

    onClick?: () => void;
}

export const ModalCross: React.FC<ModalCrossProps> = ({ onClick, className, ...attrs }) => (
    <StyledCross className={className} onClick={onClick} {...attrs}>
        <CrossIcon size="s" />
    </StyledCross>
);

export const ModalHeader = styled.div`
    z-index: 2;

    background-color: ${gray4};

    padding: ${gapM} ${gapM} ${gapS} ${gapM};

    border-top-left-radius: ${radiusM};
    border-top-right-radius: ${radiusM};
`;

export const ModalContent = styled.div`
    z-index: 1;

    padding: ${gapM};
`;

export const Modal: React.FC<ModalProps> = ({ visible, children, width = 800, onClose, onShow, ...props }) => {
    const [onESC] = useKeyboard([KeyCode.Escape], () => onClose?.(), {
        disableGlobalEvent: false,
    });

    useEffect(() => {
        if (visible) {
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [visible]);

    useEffect(() => {
        visible && onShow?.();
    }, [visible, onShow]);

    return visible ? (
        <Portal id="modal">
            <StyledModalSurface>
                <StyledModal width={width} {...onESC} {...props}>
                    {children}
                </StyledModal>
            </StyledModalSurface>
        </Portal>
    ) : null;
};
