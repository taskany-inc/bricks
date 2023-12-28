import React, { createContext, useContext, useCallback, useMemo, useEffect, useState, useRef, memo } from 'react';
import classNames from 'classnames';

import { nullable } from '../../utils';
import { Input } from '../Input/Input';
import { ListViewItem, ListView } from '../../components/ListView/ListView';
import { RadioControl as Radio, RadioGroup, RadioGroupLabel, RadioLabel } from '../RadioGroup/RadioGroup';

import classes from './AutoComplete.module.css';

type InputProps = React.ComponentProps<typeof Input>;
type AutoCompleteMode = 'single' | 'multiple';
type AutoCompleteSelectedMap = Set<string>;
type ListItemProps = Parameters<React.ComponentProps<typeof ListViewItem>['renderItem']>[0];

interface AutoCompleteRenderItemProps<T> {
    item: T;
    index: number;
    onItemClick: () => void;
    checked: boolean;
}

interface AutoCompleteRenderItem<T> {
    (props: AutoCompleteRenderItemProps<T> & ListItemProps): React.ReactNode;
}

interface AutoCompleteContext<T> {
    items: T[];
    value: T[];
    keyGetter: (item: T) => string;
    renderItem: AutoCompleteRenderItem<T>;
    onChange: (item: T) => void;
    map: React.MutableRefObject<AutoCompleteSelectedMap>;
}

interface AutoCompleteProps<T> {
    mode: AutoCompleteMode;
    items: T[];
    renderItem: AutoCompleteRenderItem<T>;
    keyGetter: (item: T) => string;
    renderItems?: (props: React.PropsWithChildren) => React.ReactNode;
    value?: T[];
    onChange: (items: T[]) => void;
}

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

interface AutoCompleteInputProps extends Omit<InputProps, 'onChange'> {
    onChange: (val: string) => void;
}

interface AutoCompleteRadioGroupProps<T extends { title: string; value: string }> {
    name: string;
    title: string;
    items: T[];
    value?: T['value'];
    onChange: (value: T) => void;
    className?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AutoCompleteContextProvider = createContext<AutoCompleteContext<any> | null>(null);

function useAutoCompleteContext<T extends { id: string }>(): AutoCompleteContext<T> {
    const ctx = useContext(AutoCompleteContextProvider) as AutoCompleteContext<T> | null;

    if (!ctx) {
        throw new Error("Don't use before initialization or outse of `AutoComplete` component");
    }

    return useMemo(() => ctx, [ctx]);
}

export function AutoCompleteRadioGroup<T extends { title: string; value: string }>({
    items,
    onChange,
    name,
    title,
    value,
    className,
    ...attrs
}: AutoCompleteRadioGroupProps<T>) {
    const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
        (event) => {
            const { value } = event.target;
            const item = items.find((it) => it.value === value);

            if (item) {
                onChange(item);
            }
        },
        [onChange, items],
    );
    return (
        <>
            {nullable(title, (t) => (
                <RadioGroupLabel className={classes.AutoCompleteHeading}>{t}</RadioGroupLabel>
            ))}
            <RadioGroup
                className={classNames(classes.AutoCompleteRadioGroup, className)}
                name={name}
                onChange={handleChange}
                value={value}
                {...attrs}
            >
                {items.map((item) => (
                    <Radio className={classes.AutoCompleteRadio} value={item.value}>
                        {item.title}
                    </Radio>
                ))}
            </RadioGroup>
        </>
    );
}

function getItemCreator<T>(
    onChange: (item: T) => void,
    map: React.MutableRefObject<AutoCompleteSelectedMap>,
    keyGetter: (item: T) => string,
) {
    return function createRenderItem<T1 extends T>(item: T1, index: number): AutoCompleteRenderItemProps<T> {
        return {
            item,
            index,
            checked: map.current.has(keyGetter(item)),
            onItemClick: () => onChange(item),
        };
    };
}

function getRenderItemWithKey<T>(
    renderItem: AutoCompleteRenderItem<T>,
    keyGetter: (item: T) => string,
): React.FC<AutoCompleteRenderItemProps<T>> {
    return function AutoCompleteListItem(props) {
        return (
            <ListViewItem
                key={keyGetter(props.item)}
                value={props.item}
                renderItem={(viewProps) => renderItem({ ...props, ...viewProps })}
            />
        );
    };
}

export const AutoCompleteList: React.FC<AutoCompleteListProps> = memo(({ title, selected, filterSelected }) => {
    const { items, value, renderItem, onChange, map, keyGetter } = useAutoCompleteContext();

    const renderer = getRenderItemWithKey(renderItem, keyGetter);
    const createRenderItem = getItemCreator(onChange, map, keyGetter);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let target: Array<any>;

    switch (true) {
        case selected:
            target = value;
            break;
        case filterSelected:
            target = items.filter((item) => !map.current.has(keyGetter(item)));
            break;
        default:
            target = items;
            break;
    }

    const itemsToRender = target.map(createRenderItem);

    return nullable(itemsToRender, (toRender) => (
        <>
            {nullable(title, (t) => (
                <span className={classes.AutoCompleteHeading}>{t}</span>
            ))}
            {toRender.map(renderer)}
        </>
    ));
});

export const AutoCompleteInput: React.FC<AutoCompleteInputProps> = ({ onChange, ...props }) => {
    const handleInputChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
        (event) => {
            onChange(event.target.value);
        },
        [onChange],
    );

    return <Input {...props} onChange={handleInputChange} />;
};

const defaultRenderItems: React.FC<React.PropsWithChildren> = ({ children }) => <>{children}</>;

export function AutoComplete<T>({
    mode,
    items,
    value = [],
    onChange,
    children,
    keyGetter,
    renderItem,
    renderItems: Component = defaultRenderItems,
}: React.PropsWithChildren<AutoCompleteProps<T>>) {
    const [selected, setSelected] = useState<T[]>(() => value);
    const currentMap = useRef<AutoCompleteSelectedMap>(new Set(selected.map((item) => keyGetter(item))));
    const selectedLengthRef = useRef(mode === 'multiple' ? selected.length : 0);

    useEffect(() => {
        if (selectedLengthRef.current !== selected.length) {
            onChange(selected);

            if (mode === 'multiple') {
                selectedLengthRef.current = selected.length;
            }
        }
    }, [selected, onChange, mode]);

    const pushItem = useCallback(
        (item: T) => {
            if (mode === 'single') {
                setSelected([item]);
                return;
            }

            currentMap.current.add(keyGetter(item));

            setSelected((prev) => {
                return prev.concat(item);
            });
        },
        [mode, keyGetter],
    );

    const popItem = useCallback(
        (item: T) => {
            currentMap.current.delete(keyGetter(item));

            setSelected((prev) => {
                const itemKey = keyGetter(item);
                return prev.filter((val) => keyGetter(val) !== itemKey);
            });
        },
        [keyGetter],
    );

    const handleChange = useCallback(
        (item: T) => {
            currentMap.current.has(keyGetter(item)) ? popItem(item) : pushItem(item);
        },
        [keyGetter, popItem, pushItem],
    );

    return (
        <AutoCompleteContextProvider.Provider
            value={{
                value: selected,
                map: currentMap,
                onChange: handleChange,
                items,
                keyGetter,
                renderItem,
            }}
        >
            <ListView onKeyboardClick={handleChange}>
                <Component>{children}</Component>
            </ListView>
        </AutoCompleteContextProvider.Provider>
    );
}
