/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useMemo, useRef, useState, forwardRef } from 'react';
import styled from 'styled-components';
import { danger10 } from '@taskany/colors';

import { useKeyPress } from '../../hooks/useKeyPress';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useKeyboard, KeyCode, KeyboardEvents } from '../../hooks/useKeyboard';
import { nullable } from '../../utils/nullable';
import { flatten } from '../../utils/flatten';
import { Popup } from '../Popup/Popup';

interface ComboBoxTriggerProps {
    text: ComboBoxProps['text'];
    value: ComboBoxProps['value'];
    disabled?: boolean;

    onClick: () => void;
}

interface ComboBoxInputProps extends Record<KeyboardEvents, React.KeyboardEventHandler<Element>> {
    value: string;
    ref: React.RefObject<HTMLInputElement>;
    disabled?: boolean;
}

interface ComboBoxItemProps {
    item: any;
    index: number;
    cursor: number;

    onClick: (value?: any) => void;
}

interface ComboBoxProps extends React.HTMLAttributes<HTMLDivElement> {
    renderInput: (props: ComboBoxInputProps) => React.ReactNode;
    renderItem: (props: ComboBoxItemProps) => React.ReactNode;
    renderTrigger?: (props: ComboBoxTriggerProps) => React.ReactNode;
    renderItems?: (children: React.ReactNode) => React.ReactNode;
    text?: string;
    value?: any;
    items?: any[];
    visible?: boolean;
    disabled?: boolean;
    error?: {
        message?: string;
    };
    maxWidth?: React.ComponentProps<typeof Popup>['maxWidth'];
    minWidth?: React.ComponentProps<typeof Popup>['minWidth'];
    maxHeight?: React.ComponentProps<typeof Popup>['maxHeight'];
    className?: string;
    placement?: React.ComponentProps<typeof Popup>['placement'];
    offset?: React.ComponentProps<typeof Popup>['offset'];

    onChange?: (value: any) => void;
    onClose?: () => void;
    onClickOutside?: (cb: () => void) => void;
}

const StyledComboBox = styled.span`
    position: relative;
    display: flex;
`;

const StyledComboBoxInputWrpper = styled.span`
    flex: 1 0 0;
`;

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

const defaultRenderItems = (children: React.ReactNode) => <>{children}</>;

export const ComboBox = forwardRef<HTMLDivElement, ComboBoxProps>(
    (
        {
            text,
            value,
            visible = false,
            items = [],
            disabled,
            error,
            maxWidth = 250,
            minWidth = 150,
            className,
            placement = 'bottom-start',
            offset = [-4, 8],
            renderItem,
            renderTrigger,
            renderInput,
            renderItems = defaultRenderItems,
            onChange,
            onClose,
            onClickOutside,
            maxHeight,
            ...attrs
        },
        ref,
    ) => {
        const popupContentRef = useRef<HTMLDivElement>(null);
        const popupRef = useRef<HTMLDivElement>(null);
        const inputRef = useRef<HTMLInputElement>(null);
        const [popupVisible, setPopupVisibility] = useState(visible);
        const [editMode, setEditMode] = useState(false);
        const downPress = useKeyPress('ArrowDown');
        const upPress = useKeyPress('ArrowUp');
        const [cursor, setCursor] = useState(0);
        const flatItems = useMemo(() => flatten(items), [items]);

        useEffect(() => {
            setPopupVisibility(visible);
        }, [visible]);

        useEffect(() => {
            if (renderTrigger) {
                setPopupVisibility(editMode);
            }
        }, [renderTrigger, editMode]);

        const onTriggerClick = useCallback(() => {
            setEditMode(true);
        }, []);

        const onItemClick = useCallback(
            (value: any) => () => {
                setEditMode(false);
                onChange?.(value);
            },
            [onChange],
        );

        const [onESC] = useKeyboard([KeyCode.Escape], () => {
            setEditMode(false);
            onClose?.();
        });

        const [onENTER] = useKeyboard([KeyCode.Enter], () => {
            onItemClick(flatItems[cursor])();
        });

        useEffect(() => {
            if (flatItems.length && downPress) {
                setCursor((prevState) => (prevState < flatItems.length - 1 ? prevState + 1 : prevState));
            }
        }, [flatItems, downPress]);

        useEffect(() => {
            if (flatItems.length && upPress) {
                setCursor((prevState) => (prevState > 0 ? prevState - 1 : prevState));
            }
        }, [flatItems, upPress]);

        const onErrorMouseEnter = useCallback(() => setPopupVisibility(true), []);
        const onErrorMouseLeave = useCallback(() => setPopupVisibility(false), []);

        useClickOutside(inputRef, (e) => {
            onClickOutside?.(() => {
                // popup is outside of component
                if (!popupContentRef.current?.contains(e.target as Node)) {
                    setEditMode(false);
                    onClose?.();
                }
            });
        });

        const children = flatItems.map((item: any, index: number) =>
            renderItem({ item, index, cursor, onClick: onItemClick(item) }),
        );

        return (
            <StyledComboBox ref={ref} className={className} {...attrs}>
                {nullable(error, (err) => (
                    <>
                        <StyledErrorTrigger
                            ref={popupRef}
                            onMouseEnter={onErrorMouseEnter}
                            onMouseLeave={onErrorMouseLeave}
                        />
                        <Popup tooltip view="danger" placement="top-start" visible={popupVisible} reference={popupRef}>
                            {err.message}
                        </Popup>
                    </>
                ))}

                <StyledComboBoxInputWrpper ref={popupRef} {...onESC}>
                    {renderTrigger ? (
                        <>
                            {editMode
                                ? renderInput({ value, disabled, ref: inputRef, ...onENTER })
                                : renderTrigger({ text, value, disabled, onClick: onTriggerClick })}
                        </>
                    ) : (
                        renderInput({ value, disabled, ref: inputRef, ...onENTER })
                    )}
                </StyledComboBoxInputWrpper>

                <Popup
                    placement={placement}
                    visible={popupVisible && Boolean(flatItems.length)}
                    reference={popupRef}
                    interactive
                    arrow={false}
                    minWidth={minWidth}
                    maxWidth={maxWidth}
                    maxHeight={maxHeight}
                    offset={offset}
                >
                    <div ref={popupContentRef} {...onESC}>
                        {renderItems(children)}
                    </div>
                </Popup>
            </StyledComboBox>
        );
    },
);
