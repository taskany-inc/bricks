import React, { createContext, useContext, useCallback, useMemo, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { gapS, gapXs, gray4, gray7 } from '@taskany/colors';

import { nullable } from '../utils';

import { Text } from './Text';
import { Input } from './Input';

type InputProps = React.ComponentProps<typeof Input>;
type AutoCompleteMode = 'single' | 'multiple';
type AutoCompleteSelectedMap<T> = Set<T>;

interface AutoCompleteRenderItemProps<T> {
    item: T;
    index: number;
    onItemClick: () => void;
    checked: boolean;
}

interface AutoCompleteRenderItem<T> {
    (props: AutoCompleteRenderItemProps<T>): React.ReactNode;
}

interface AutoCompleteContext<T> {
    items: T[];
    value: T[];
    renderItem: AutoCompleteRenderItem<T>;
    renderItems: (props: React.PropsWithChildren) => React.ReactNode;
    renderState: 'combine' | 'split';
    switchType: () => void;
    popItem: (item: T) => void;
    pushItem: (item: T) => void;
    map: React.MutableRefObject<AutoCompleteSelectedMap<T>>;
}

interface AutoCompleteProps<T> {
    mode: AutoCompleteMode;
    items: T[];
    renderItem: AutoCompleteRenderItem<T>;
    renderItems?: (props: React.PropsWithChildren) => React.ReactNode;
    value?: T[];
    onChange: (items: T[]) => void;
}

interface AutoCompleteListProps {
    title?: string;
    selected?: boolean;
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

const StyledText = styled(Text).attrs({
    size: 's',
    color: gray7,
})`
    width: 100%;
    border-bottom: 1px solid ${gray4};
    margin: ${gapS} 0;
`;

const StyledLabel = styled.label`
    display: inline-flex;
    flex-wrap: nowrap;
    align-items: baseline;

    input[type='radio'] {
        padding: 0;
        margin: 0;
        margin-right: ${gapXs};
    }
`;

const StyledRadioGroup = styled.div`
    display: flex;
    align-items: center;
    gap: ${gapS};
`;

export function AutoCompleteRadioGroup<T extends { title: string; value: string }>({
    items,
    onChange,
    name,
    title,
    value,
    className,
}: AutoCompleteRadioGroupProps<T>) {
    return (
        <>
            {nullable(title, (t) => (
                <StyledText>{t}</StyledText>
            ))}
            <StyledRadioGroup className={className}>
                {items.map((item) => (
                    <StyledLabel key={item.title}>
                        <input
                            type="radio"
                            name={name}
                            id={item.title}
                            value={item.value}
                            onChange={() => onChange(item)}
                            defaultChecked={item.value === value}
                        />
                        <Text size="s" color={gray7} as="span">
                            {item.title}
                        </Text>
                    </StyledLabel>
                ))}
            </StyledRadioGroup>
        </>
    );
}

function getItemCreator<T>(onChange: (item: T) => void, map: React.MutableRefObject<AutoCompleteSelectedMap<T>>) {
    return function createRenderItem<T1 extends T>(item: T1, index: number): AutoCompleteRenderItemProps<T> {
        return {
            item,
            index,
            checked: map.current.has(item),
            onItemClick: () => onChange(item),
        };
    };
}

export function AutoCompleteList({ title, selected }: AutoCompleteListProps) {
    const {
        items,
        value,
        renderItem,
        renderItems: Component,
        renderState,
        switchType,
        popItem,
        pushItem,
        map,
    } = useAutoCompleteContext();

    useEffect(() => {
        if (selected) {
            switchType();
        }
    }, [selected, switchType]);

    const onChange = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item: any) => {
            const itemInMap = map.current.has(item);

            if (itemInMap) {
                popItem(item);
            } else {
                pushItem(item);
            }
        },
        [map, popItem, pushItem],
    );

    const createRenderItem = getItemCreator(onChange, map);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const itemsToRender: AutoCompleteRenderItemProps<any>[] = useMemo(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let target: Array<any>;

        if (renderState === 'split') {
            if (selected) {
                target = value;
            } else {
                target = items.filter((item) => !map.current.has(item));
            }
        } else {
            target = items;
        }

        return target.map(createRenderItem);
    }, [renderState, items, value, selected, createRenderItem, map]);

    return nullable(itemsToRender, (toRender) => (
        <>
            {nullable(title, (t) => (
                <StyledText>{t}</StyledText>
            ))}
            <Component>{toRender.map(renderItem)}</Component>
        </>
    ));
}

export const AutoCompleteInput: React.FC<AutoCompleteInputProps> = ({ onChange, ...props }) => {
    const handleInputChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
        onChange(event.target.value);
    }, []);

    return <Input {...props} onChange={handleInputChange} />;
};

const defaultRenderItems: React.FC<React.PropsWithChildren> = ({ children }) => <>{children}</>;

export function AutoComplete<T>({
    mode,
    items,
    value = [],
    onChange,
    children,
    renderItem,
    renderItems = defaultRenderItems,
}: React.PropsWithChildren<AutoCompleteProps<T>>) {
    const [type, setType] = useState<AutoCompleteContext<T>['renderState']>('combine');
    const [selected, setSelected] = useState<T[]>(() => value);

    const currentMap = useRef<Set<T>>(new Set(selected));

    const switchType = useCallback(() => {
        setType('split');
    }, []);

    useEffect(() => {
        onChange(selected);
    }, [selected, onChange]);

    const pushItem = useCallback(
        (item: T) => {
            if (mode === 'multiple') {
                currentMap.current.add(item);
                setSelected((prev) => {
                    return prev.concat(item);
                });

                return;
            }

            setSelected([item]);
        },
        [mode, onChange],
    );

    const popItem = useCallback((item: T) => {
        currentMap.current.delete(item);
        setSelected(() => {
            const next: T[] = [];
            currentMap.current.forEach((val) => next.push(val));

            return next;
        });
    }, []);

    return (
        <AutoCompleteContextProvider.Provider
            value={{
                value: selected,
                renderState: type,
                switchType,
                items,
                renderItem,
                renderItems,
                popItem,
                pushItem,
                map: currentMap,
            }}
        >
            {children}
        </AutoCompleteContextProvider.Provider>
    );
}
