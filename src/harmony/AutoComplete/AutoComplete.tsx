import React, { ComponentProps, ReactNode, createContext, useCallback, useContext, useMemo } from 'react';

import { useLatest } from '../../hooks/useLatest';
import { ListView, ListViewItem } from '../ListView/ListView';
import { Text } from '../Text/Text';
import { nullable } from '../../utils';

import s from './AutoComplete.module.css';

type ListViewItemRenderProps = Parameters<ComponentProps<typeof ListViewItem>['renderItem']>['0'];

interface AutoCompleteContext<T> {
    items: T[];
    value?: T[];
    mode?: 'single' | 'multiple';
    selectedItems: Record<string, boolean>;
    onChange: (item: T) => void;
    renderItem?: (props: { item: T; onChange: () => void; isSelected: boolean } & ListViewItemRenderProps) => ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AutoCompleteContext = createContext<AutoCompleteContext<any>>({
    items: [],
    mode: 'single',
    selectedItems: {},
    onChange: () => {},
});

interface AutocompleteProps<T> extends Omit<AutoCompleteContext<T>, 'onChange' | 'selectedItems'> {
    children: ReactNode;
    value?: T[];
    onChange?: (items: T[]) => void;
}

export const AutoComplete = <T extends { id: string }>({
    children,
    items,
    value,
    mode = 'single',
    onChange,
    renderItem,
}: AutocompleteProps<T>) => {
    const selectedItems = useMemo(() => {
        return (value || []).reduce<Record<string, boolean>>((acc, cur) => {
            if (cur?.id) acc[cur.id] = true;
            return acc;
        }, {});
    }, [value]);

    const valueRef = useLatest({ value, selectedItems });

    const handleChange = useCallback(
        (item: T) => {
            if (mode === 'multiple' && Array.isArray(valueRef.current.value)) {
                const restValues = valueRef.current.selectedItems[item.id]
                    ? valueRef.current.value.filter((value) => value.id !== item.id)
                    : valueRef.current.value.concat(item);

                onChange?.(restValues);
                return;
            }

            onChange?.([item]);
        },
        [mode, onChange, valueRef],
    );

    const ctx = useMemo(() => {
        return {
            mode,
            items,
            selectedItems,
            value,
            onChange: handleChange as (item: { id: string }) => void,
            renderItem,
        };
    }, [mode, items, selectedItems, value, handleChange, renderItem]);

    return (
        <AutoCompleteContext.Provider value={ctx}>
            <ListView onKeyboardClick={handleChange}>{children}</ListView>
        </AutoCompleteContext.Provider>
    );
};

interface AutoCompleteListProps {
    title?: string;
    /**
     * Render only selected items
     */
    selected?: boolean;
    /**
     * Render filtered items by value
     */
    filterSelected?: boolean;
}

export const AutoCompleteList = <T extends { id: string }>({
    title,
    selected,
    filterSelected,
}: AutoCompleteListProps) => {
    const { items, value, selectedItems, onChange, renderItem } =
        useContext<AutoCompleteContext<T>>(AutoCompleteContext);

    const render = useCallback(
        (item: T) => (props: ListViewItemRenderProps) => {
            return renderItem?.({ ...props, item, onChange: () => onChange(item), isSelected: selectedItems[item.id] });
        },
        [onChange, renderItem, selectedItems],
    );

    let array: typeof items = [];

    switch (true) {
        case filterSelected: {
            array = items.filter(({ id }) => !selectedItems[id]);
            break;
        }
        case selected: {
            array = value || items.filter(({ id }) => selectedItems[id]);
            break;
        }
        default: {
            array = items;
        }
    }

    return (
        <>
            {nullable(array.length && title, (t) => (
                <Text size="s" weight="bold" className={s.AutoCompleteHeading}>
                    {t}
                </Text>
            ))}
            {array.map((item) => {
                return <ListViewItem key={item.id} renderItem={render(item)} value={item} />;
            })}
        </>
    );
};
