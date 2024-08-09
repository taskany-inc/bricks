import React, { CSSProperties, ComponentProps, HTMLAttributes, PropsWithChildren, useEffect, useMemo } from 'react';
import { IconXOutline } from '@taskany/icons';
import cn from 'classnames';

import { useKeyboard, KeyCode } from '../../hooks/useKeyboard';
import { Portal } from '../../components/Portal';
import { nullable } from '../../utils';
import { Button } from '../Button/Button';
import { Text } from '../Text/Text';

import s from './Modal.module.css';

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
    visible?: boolean;
    width?: string | number;

    onClose?: () => void;
    onShow?: () => void;
}

interface ModalCrossProps extends Omit<ComponentProps<typeof Button>, 'view'> {}

export const ModalCross = ({ className, size = 's', ...props }: ModalCrossProps) => (
    <Button
        size={size}
        view="ghost"
        className={cn(s.ModalCross, className)}
        iconLeft={<IconXOutline size={size} />}
        {...props}
    />
);

export const ModalOverlay = ({ children }: PropsWithChildren) => <div className={s.ModalOverlay}>{children}</div>;

interface ModalContentProps extends HTMLAttributes<HTMLDivElement> {}

export const ModalContent = ({ className, children, ...props }: ModalContentProps) => (
    <div className={cn(s.ModalContent, className)} {...props}>
        {children}
    </div>
);

const modalHeaderViewMap = {
    danger: s.ModalHeader_view_danger,
    warning: s.ModalHeader_view_warning,
};

interface ModalHeaderProps extends Omit<ComponentProps<typeof Text>, 'as'> {
    view?: keyof typeof modalHeaderViewMap;
}

export const ModalHeader = ({ className, children, view, ...props }: ModalHeaderProps) => (
    <Text
        className={cn(s.ModalHeader, view ? modalHeaderViewMap[view] : '', className)}
        weight="bold"
        size="l"
        {...props}
    >
        {children}
    </Text>
);

export const Modal = ({ visible, children, width = 800, onClose, onShow, style, className, ...props }: ModalProps) => {
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

    const modalStyles: CSSProperties = useMemo(() => {
        const styles: Record<string, unknown> = {};

        if (width) {
            styles['--modal-width'] = typeof width === 'number' ? `${width}px` : width;
        }

        return { ...styles, ...style };
    }, [width, style]);

    return nullable(visible, () => (
        <Portal id="modal">
            <ModalOverlay>
                <div className={cn(s.Modal, className)} style={modalStyles} {...onESC} {...props}>
                    {children}
                </div>
            </ModalOverlay>
        </Portal>
    ));
};
