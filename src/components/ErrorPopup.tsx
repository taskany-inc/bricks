import React, { ComponentProps, useCallback, useEffect, useRef, useState } from 'react';
import { danger10 } from '@taskany/colors';
import styled, { css } from 'styled-components';

import { nullable } from '../utils';

import { Popup } from './Popup/Popup';

interface DotOffset {
    placement?: 'center' | 'top';
}
export interface ErrorPopupProps extends React.HTMLAttributes<HTMLSpanElement> {
    err?: {
        message?: string;
    };
    visible?: boolean;
    placement?: ComponentProps<typeof Popup>['placement'];
    dotPlacement?: DotOffset['placement'];
}

const dotPlacementMixin = css<DotOffset>`
    ${({ placement }) => {
        if (!placement || placement === 'center') {
            return {
                top: '50%',
                transform: 'translateY(-50%)',
            };
        }

        return {
            top: '11px',
        };
    }}
    left: -3px;
`;

const StyledErrorTrigger = styled.span<DotOffset>`
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 100%;
    background-color: ${danger10};

    z-index: 1;

    ${dotPlacementMixin}
`;

export const ErrorPopup: React.FC<React.PropsWithChildren<ErrorPopupProps>> = ({
    err,
    visible,
    placement = 'top-start',
    dotPlacement = 'center',
    children,
    ...attrs
}) => {
    const popupRef = useRef<HTMLDivElement>(null);
    const [popupVisible, setPopupVisibility] = useState(visible);

    useEffect(() => {
        setPopupVisibility(visible);
    }, [visible]);

    const onClickOutside = useCallback(() => {
        setPopupVisibility(false);
    }, []);

    return (
        <>
            <StyledErrorTrigger
                ref={popupRef}
                onMouseEnter={() => setPopupVisibility(true)}
                onMouseLeave={() => setPopupVisibility(false)}
                placement={dotPlacement}
                {...attrs}
            />
            <Popup
                onClickOutside={onClickOutside}
                tooltip
                view="danger"
                placement={placement}
                visible={popupVisible}
                reference={popupRef}
            >
                {children || nullable(err, ({ message }) => message)}
            </Popup>
        </>
    );
};
