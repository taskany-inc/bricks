import React, { ComponentProps, useCallback, useEffect, useRef, useState } from 'react';
import { danger10 } from '@taskany/colors';
import styled from 'styled-components';

import { Popup } from './Popup/Popup';

const StyledErrorTrigger = styled.div`
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 100%;
    background-color: ${danger10};
    top: 11px;
    left: -2px;
    z-index: 1;
`;

export type ErrorPopupProps = {
    err: {
        message?: string;
    };
    visible?: boolean;
    placement?: ComponentProps<typeof Popup>['placement'];
};

export const ErrorPopup = ({ err, visible, placement }: ErrorPopupProps) => {
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
            />
            <Popup
                onClickOutside={onClickOutside}
                tooltip
                view="danger"
                placement={placement}
                visible={popupVisible}
                reference={popupRef}
            >
                {err.message}
            </Popup>
        </>
    );
};
