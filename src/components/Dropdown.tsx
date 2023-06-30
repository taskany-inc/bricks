/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useRef, useState, ComponentProps, useMemo } from 'react';
import styled from 'styled-components';
import { danger10 } from '@taskany/colors';

import { nullable } from '../utils/nullable';
import { useKeyPress } from '../hooks/useKeyPress';
import { useKeyboard, KeyCode } from '../hooks/useKeyboard';

import { Popup } from './Popup';
import Input from './Input';
import { CrossIcon } from './Icon/CrossIcon';

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

export interface DropdownProps {
    renderItem: (props: DropdownItemProps) => React.ReactNode;
    renderTrigger: (props: DropdownTriggerProps) => React.ReactNode;
    text?: string;
    value?: any;
    items?: any[];
    searchFilter?: (item: any, query: string) => boolean;
    visible?: boolean;
    disabled?: boolean;
    className?: string;
    placement?: ComponentProps<typeof Popup>['placement'];
    arrow?: ComponentProps<typeof Popup>['arrow'];
    offset?: ComponentProps<typeof Popup>['offset'];

    error?: {
        message?: string;
    };

    onChange?: (value: any) => void;
}

const StyledDropdown = styled.span`
    position: relative;
    display: inline-block;
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

export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
    (
        {
            visible = false,
            items = [],
            searchFilter,
            text,
            value,
            disabled,
            error,
            renderItem,
            renderTrigger,
            onChange,
            className,
            placement = 'bottom-start',
            arrow = false,
            offset = [-4, 8],
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
        const filteredItems = useMemo(
            () => (query && searchFilter ? items.filter((item) => searchFilter(item, query)) : items),
            [query, items, searchFilter],
        );

        const searchBoxRef = useRef<HTMLInputElement>(null);
        useEffect(() => {
            const { current } = searchBoxRef;

            if (popupVisible && searchFilter && current) {
                current.focus();
            }
        }, [searchFilter, popupVisible]);

        return (
            <StyledDropdown className={className} ref={ref}>
                {!disabled &&
                    nullable(error, (err) => (
                        <>
                            <StyledErrorTrigger
                                ref={popupRef}
                                onMouseEnter={() => setPopupVisibility(true)}
                                onMouseLeave={() => setPopupVisibility(false)}
                            />
                            <Popup
                                tooltip
                                view="danger"
                                placement={placement}
                                visible={popupVisible}
                                onClickOutside={onClickOutside}
                                reference={popupRef}
                            >
                                {err.message}
                            </Popup>
                        </>
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
                    visible={popupVisible && Boolean(items.length)}
                    onClickOutside={onClickOutside}
                    reference={popupRef}
                    interactive
                    arrow={arrow}
                    minWidth={100}
                    maxWidth={250}
                    offset={offset}
                >
                    <div {...onESC}>
                        {nullable(searchFilter, () => (
                            <Input
                                placeholder="search"
                                value={query}
                                ref={searchBoxRef}
                                onChange={({ target }) => {
                                    setQuery(target?.value);
                                }}
                                iconRight={
                                    <CrossIcon
                                        size="xxs"
                                        onClick={() => {
                                            setQuery('');
                                            searchBoxRef.current?.focus();
                                        }}
                                    />
                                }
                            />
                        ))}
                        {filteredItems?.map((item, index) =>
                            renderItem({ item, index, cursor, onClick: onItemClick(item) }),
                        )}
                    </div>
                </Popup>
            </StyledDropdown>
        );
    },
);

export default Dropdown;
