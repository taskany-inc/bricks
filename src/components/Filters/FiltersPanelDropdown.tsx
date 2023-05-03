/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import React, { useEffect, useCallback, ReactNode, useMemo } from 'react';

import Dropdown, { DropdownItemProps } from '../Dropdown';
import MenuItem from '../MenuItem';

import { FiltersMenuItem } from './FiltersMenuItem';
import { FilterValueDescriptor, useFilter } from './FiltersPanel';

interface FiltersDropdownItemProps<T> extends DropdownItemProps {
    item: FilterValueDescriptor<T>;
    selected: boolean;
}

type FilterDropdownProps = {
    title: string;
    id: string;
    disabled?: boolean;
    items: string[];
    type?: 'single' | 'multiselect';
    renderItem?: (props: FiltersDropdownItemProps<any>) => ReactNode;
    getValueDescriptor?: (id: string) => FilterValueDescriptor<any> | null;
};

export const useSerializedDropdownItems = <T extends unknown>(
    items: T[],
    getDescriptorFromItem: (value: T) => FilterValueDescriptor<T> | null,
) => {
    return useMemo(() => {
        const { ids, map } = items.reduce(
            (acum, item) => {
                const descriptor = getDescriptorFromItem(item);

                if (descriptor) {
                    acum.ids.push(descriptor.id);
                    acum.map[descriptor.id] = item;
                }

                return acum;
            },
            { ids: [], map: {} } as { ids: string[]; map: Record<string, T> },
        );

        const getValueDescriptor = (id: string): FilterValueDescriptor<T> | null =>
            map[id] ? getDescriptorFromItem(map[id]) : null;

        return {
            ids,
            map,
            getValueDescriptor,
        };
    }, [items, getDescriptorFromItem]);
};

const defaultRenderItem: FilterDropdownProps['renderItem'] = ({ item, selected, onClick }) => (
    <MenuItem ghost key={item.id} selected={selected} onClick={onClick}>
        {item.name}
    </MenuItem>
);

const defaultValueDescriptor: FilterDropdownProps['getValueDescriptor'] = (id) => ({ id, name: id });

export const FiltersPanelDropdown = React.forwardRef<HTMLDivElement, FilterDropdownProps>(
    (
        {
            title,
            type = 'multiselect',
            id,
            disabled,
            items,
            renderItem = defaultRenderItem,
            getValueDescriptor = defaultValueDescriptor,
        },
        ref,
    ) => {
        const { remove, value, set } = useFilter({
            title,
            id,
            value: [],
            getValueDescriptor,
        });

        const onChange = useCallback(
            (item: string) => {
                if (type === 'single') {
                    set([item]);
                } else {
                    const existedIndex = value.indexOf(item);

                    if (existedIndex >= 0) {
                        value.splice(existedIndex, 1);

                        set([...value]);
                    } else {
                        set([...value, item]);
                    }
                }
            },
            [set, value, type],
        );

        useEffect(() => () => remove(), [remove]);

        return (
            <Dropdown
                ref={ref}
                text={title}
                value={value}
                onChange={onChange}
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
                renderItem={(props) => {
                    const item = getValueDescriptor(props.item);

                    return item
                        ? renderItem({
                              ...props,
                              item,
                              selected: value.indexOf(props.item) >= 0,
                          })
                        : null;
                }}
            />
        );
    },
);
