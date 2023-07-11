/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { danger10 } from '@taskany/colors';

import { useKeyPress } from '../hooks/useKeyPress';
import { useClickOutside } from '../hooks/useClickOutside';
import { useKeyboard, KeyCode, KeyboardEvents } from '../hooks/useKeyboard';
import { nullable } from '../utils/nullable';
import { flatten } from '../utils/flatten';

import { Popup } from './Popup';

interface ComboBoxTriggerProps<T extends HTMLElement = HTMLButtonElement, R extends React.Ref<T> = React.Ref<T>> {
    text: ComboBoxProps<T>['text'];
    value: ComboBoxProps<T>['value'];
    ref: R;
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

interface ComboBoxProps<T extends HTMLElement> {
    renderInput: (props: ComboBoxInputProps) => React.ReactNode;
    renderItem: (props: ComboBoxItemProps) => React.ReactNode | Record<any, any>;
    renderTrigger?: (props: ComboBoxTriggerProps<T>) => React.ReactNode;
    renderItems?: (children: React.ReactNode | Array<Record<any, any>> | undefined) => React.ReactNode;
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
    className?: string;
    placement?: React.ComponentProps<typeof Popup>['placement'];
    offset?: React.ComponentProps<typeof Popup>['offset'];

    onChange?: (value: any) => void;
    onClose?: () => void;
    onClickOutside?: (cb: () => void) => void;
}

const StyledComboBox = styled.span`
    position: relative;
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

export function ComboBoxRenderFunction<T extends HTMLElement>(
    props: ComboBoxProps<T>,
    ref: React.ForwardedRef<HTMLDivElement>,
): React.ReactElement {
    const {
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
        renderItems,
        onChange,
        onClose,
        onClickOutside,
    } = props;
    const popupContentRef = useRef<HTMLDivElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<T>(null);
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
        <StyledComboBox ref={ref} className={className}>
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

            <span ref={popupRef} {...onESC}>
                {renderTrigger ? (
                    <>
                        {editMode
                            ? renderInput({ value, disabled, ref: inputRef, ...onENTER })
                            : renderTrigger({ text, value, disabled, ref: triggerRef, onClick: onTriggerClick })}
                    </>
                ) : (
                    renderInput({ value, disabled, ref: inputRef, ...onENTER })
                )}
            </span>

            <Popup
                placement={placement}
                visible={popupVisible && Boolean(flatItems.length)}
                reference={popupRef}
                interactive
                arrow={false}
                minWidth={minWidth}
                maxWidth={maxWidth}
                offset={offset}
            >
                <div ref={popupContentRef} {...onESC}>
                    {renderItems ? renderItems(children as React.ReactNode) : (children as React.ReactNode)}
                </div>
            </Popup>
        </StyledComboBox>
    );
}

export const ComboBox = <T extends HTMLElement>(
    props: React.PropsWithoutRef<ComboBoxProps<T>> & React.RefAttributes<HTMLDivElement>,
) => {
    return React.forwardRef<HTMLDivElement, typeof props>(ComboBoxRenderFunction)(props);
};

export default ComboBox;
