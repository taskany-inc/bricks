/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useRef, useState, ComponentProps } from 'react';
import styled from 'styled-components';
import { IconXOutline } from '@taskany/icons';

import { nullable } from '../../utils/nullable';
import { useKeyPress } from '../../hooks/useKeyPress';
import { useKeyboard, KeyCode } from '../../hooks/useKeyboard';
import { Popup } from '../Popup/Popup';
import { Input } from '../Input/Input';
import { MenuItem } from '../MenuItem';
import { ErrorPopup } from '../ErrorPopup';

interface DropdownTriggerProps {
    ref: React.RefObject<HTMLButtonElement>;
    value?: DropdownProps['value'];
    visible?: boolean;
    disabled?: boolean;
    text?: string;

    onClick: () => void;
}

export interface DropdownItemProps {
    item: any;
    index: number;
    cursor: number;

    onClick: (value?: any) => void;
}

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
    renderItem: (props: DropdownItemProps) => React.ReactNode;
    renderTrigger: (props: DropdownTriggerProps) => React.ReactNode;
    renderItems?: (children: React.ReactNode) => React.ReactNode;
    text?: string;
    value?: any;
    items?: any[];
    onSearchChange?: (query: string) => void;
    visible?: boolean;
    disabled?: boolean;
    className?: string;
    placement?: ComponentProps<typeof Popup>['placement'];
    errorMessagePlacement?: ComponentProps<typeof Popup>['placement'];
    arrow?: ComponentProps<typeof Popup>['arrow'];
    offset?: ComponentProps<typeof Popup>['offset'];
    searchPlaceholder?: string;
    emptyText?: string;
    maxHeight?: number;

    error?: {
        message?: string;
    };

    onChange?: (value: any) => void;
}

const StyledDropdown = styled.span`
    position: relative;
    display: inline-block;
`;

const defaultRenderItemsFunc = (children: React.ReactNode) => <>{children}</>;

export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
    (
        {
            visible = false,
            items = [],
            onSearchChange,
            text,
            value,
            disabled,
            error,
            renderItem,
            renderTrigger,
            renderItems = defaultRenderItemsFunc,
            onChange,
            className,
            searchPlaceholder = 'Search',
            emptyText = 'No items found',
            placement = 'bottom-start',
            errorMessagePlacement = 'bottom-start',
            arrow = false,
            offset = [-4, 8],
            maxHeight,
            ...attrs
        },
        ref,
    ) => {
        const popupRef = useRef<HTMLDivElement>(null);
        const buttonRef = useRef<HTMLButtonElement>(null);
        const [popupVisible, setPopupVisibility] = useState(visible);
        const downPress = useKeyPress('ArrowDown');
        const upPress = useKeyPress('ArrowUp');
        const [cursor, setCursor] = useState(0);

        useEffect(() => {
            setPopupVisibility(visible);
        }, [visible]);

        const onClickOutside = useCallback(() => {
            setPopupVisibility(false);
        }, []);

        const onTriggerClick = useCallback(() => {
            setPopupVisibility(true);
        }, []);

        const onItemClick = useCallback(
            (value: any) => () => {
                setPopupVisibility(false);
                onChange && onChange(value);
            },
            [onChange],
        );

        const [onESC] = useKeyboard([KeyCode.Escape], () => {
            setPopupVisibility(false);
        });

        const [onENTER] = useKeyboard([KeyCode.Enter], () => {
            onItemClick(items[cursor])();
        });

        useEffect(() => {
            if (items?.length && downPress) {
                setCursor((prevState) => (prevState < items.length - 1 ? prevState + 1 : prevState));
            }
        }, [items, downPress]);

        useEffect(() => {
            if (items?.length && upPress) {
                setCursor((prevState) => (prevState > 0 ? prevState - 1 : prevState));
            }
        }, [items, upPress]);

        const [query, setQuery] = useState('');

        const searchBoxRef = useRef<HTMLInputElement>(null);
        useEffect(() => {
            const { current } = searchBoxRef;

            if (popupVisible && onSearchChange && current) {
                current.focus();
            }
        }, [onSearchChange, popupVisible]);

        return (
            <StyledDropdown className={className} ref={ref} {...attrs}>
                {!disabled &&
                    nullable(error, (err) => (
                        <ErrorPopup err={err} visible={popupVisible} placement={errorMessagePlacement} />
                    ))}

                <span ref={popupRef} {...onESC}>
                    <span {...onENTER}>
                        {renderTrigger({
                            ref: buttonRef,
                            value,
                            text,
                            disabled,
                            visible: popupVisible,
                            onClick: onTriggerClick,
                        })}
                    </span>
                </span>

                <Popup
                    placement={placement}
                    visible={popupVisible}
                    onClickOutside={onClickOutside}
                    reference={popupRef}
                    interactive
                    arrow={arrow}
                    maxHeight={maxHeight}
                    minWidth={100}
                    maxWidth={250}
                    offset={offset}
                >
                    <div {...onESC}>
                        {nullable(onSearchChange, () => (
                            <Input
                                placeholder={searchPlaceholder}
                                value={query}
                                ref={searchBoxRef}
                                onChange={({ target }) => {
                                    const { value = '' } = target || {};
                                    setQuery(value);
                                    onSearchChange && onSearchChange(value);
                                }}
                                iconRight={
                                    <IconXOutline
                                        size="xxs"
                                        onClick={() => {
                                            setQuery('');
                                            onSearchChange && onSearchChange('');
                                            searchBoxRef.current?.focus();
                                        }}
                                    />
                                }
                            />
                        ))}
                        {renderItems(
                            items?.map((item, index) =>
                                renderItem({ item, index, cursor, onClick: onItemClick(item) }),
                            ),
                        )}
                        {nullable(!items.length, () => (
                            <MenuItem ghost disabled>
                                {emptyText}
                            </MenuItem>
                        ))}
                    </div>
                </Popup>
            </StyledDropdown>
        );
    },
);
