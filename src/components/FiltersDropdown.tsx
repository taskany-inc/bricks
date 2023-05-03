/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import React, { useCallback, ReactNode } from 'react';

import Dropdown, { DropdownItemProps } from './Dropdown';
import MenuItem from './MenuItem';
import { FiltersMenuItem } from './FiltersContainers';

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
};

export const FiltersDropdownBase = React.forwardRef<HTMLDivElement, FilterDropdownBaseProps<any>>(
    ({ text, type = 'multiselect', disabled, items, value, onChange, renderItem }, ref) => {
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

export const FiltersDropdown = React.forwardRef<HTMLDivElement, Omit<FilterDropdownBaseProps<string>, 'renderItem'>>(
    (props, ref) => (
        <FiltersDropdownBase
            ref={ref}
            {...props}
            renderItem={({ item, selected, onClick }) => (
                <MenuItem ghost key={item.id} selected={selected} onClick={onClick}>
                    {item.data}
                </MenuItem>
            )}
        />
    ),
);
