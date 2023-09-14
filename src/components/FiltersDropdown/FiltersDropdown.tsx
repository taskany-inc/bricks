/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import React, { useCallback, useMemo, useState, ReactNode } from 'react';

import { Dropdown, DropdownItemProps, DropdownProps } from '../Dropdown';
import { MenuItem } from '../MenuItem';
import { FiltersMenuItem } from '../FiltersContainers';

export type FilterDropdownItem<T> = {
    id: string;
    data: T;
};

export interface FiltersDropdownItemProps<T> extends DropdownItemProps {
    item: FilterDropdownItem<T>;
    selected: boolean;
}

export type FilterDropdownBaseProps<T> = {
    text: string;
    disabled?: boolean;
    items: FilterDropdownItem<T>[];
    value: string[];
    type?: 'single' | 'multiselect';
    onChange: (value: string[]) => void;
    renderItem: (props: FiltersDropdownItemProps<T>) => ReactNode;
    onSearchChange?: DropdownProps['onSearchChange'];
};

export const FiltersDropdownBase = React.forwardRef<HTMLDivElement, FilterDropdownBaseProps<any>>(
    ({ text, type = 'multiselect', disabled, items, value, onChange, renderItem, onSearchChange }, ref) => {
        const onChangeHandler = useCallback(
            (item: FilterDropdownItem<any>) => {
                const existedIndex = value.indexOf(item.id);

                if (type === 'single') {
                    onChange(existedIndex >= 0 ? [] : [item.id]);
                } else if (existedIndex >= 0) {
                    value.splice(existedIndex, 1);

                    onChange([...value]);
                } else {
                    onChange([...value, item.id]);
                }
            },
            [type, value, onChange],
        );

        return (
            <Dropdown
                ref={ref}
                text={text}
                value={value}
                onChange={onChangeHandler}
                items={items}
                disabled={disabled}
                onSearchChange={onSearchChange}
                renderTrigger={(props) => (
                    <FiltersMenuItem
                        ref={props.ref}
                        active={Boolean(value?.length)}
                        disabled={props.disabled}
                        onClick={props.onClick}
                    >
                        {props.text}
                    </FiltersMenuItem>
                )}
                renderItem={(props) =>
                    renderItem({
                        ...props,
                        selected: value.indexOf(props.item.id) >= 0,
                    })
                }
            />
        );
    },
);

interface FilterDropdownProps extends Omit<FilterDropdownBaseProps<string>, 'renderItem' | 'onSearchChange'> {
    search?: boolean;
}

export const FiltersDropdown = React.forwardRef<HTMLDivElement, FilterDropdownProps>(
    ({ search, items, ...props }, ref) => {
        const [query, setQuery] = useState('');

        const filteredItems = useMemo(() => {
            if (!search) {
                return items;
            }

            return items.filter((item) => item.data.toLowerCase().includes(query.toLowerCase()));
        }, [items, query, search]);

        return (
            <FiltersDropdownBase
                ref={ref}
                items={filteredItems}
                {...props}
                onSearchChange={search ? setQuery : undefined}
                renderItem={({ item, selected, onClick }) => (
                    <MenuItem ghost key={item.id} selected={selected} onClick={onClick}>
                        {item.data}
                    </MenuItem>
                )}
            />
        );
    },
);
