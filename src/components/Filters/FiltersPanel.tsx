import React, {
    ReactNode,
    createContext,
    forwardRef,
    useCallback,
    useContext,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';

import { FiltersPanelContainer, FiltersPanelContent } from './FiltersBlocks';

export type FilterValueDescriptor<T> = {
    item?: T;
    name: string;
    id: string;
};

type Filter = {
    title: string;
    id: string;
    value: string[];

    getValueDescriptor: <T>(value: string) => FilterValueDescriptor<T> | null;
};

export type FiltersState = Record<string, Filter>;

type FiltersContext = {
    count?: number;
    total?: number;

    state: FiltersState;
    setFilter: (key: string, filter: Filter) => void;
    reset: () => void;
    remove: (key: string) => void;
};

const nope = () => {};

const FiltersContext = createContext<FiltersContext>({
    state: {},
    reset: nope,
    remove: nope,
    setFilter: nope,
});

export const useFilterContext = () => useContext(FiltersContext);

export type FilterControl = {
    value: string[];
    set: (value: string[]) => void;
    reset: () => void;
    remove: () => void;
};

export const useFilter = (defaults: Filter): FilterControl => {
    const [filter] = useState<Filter>(defaults);
    const { state, setFilter, remove: removeByKey } = useFilterContext();

    const set = useCallback(
        (value: string[]) => {
            setFilter(filter.id, {
                ...filter,
                value,
            });
        },
        [setFilter, filter],
    );

    const reset = useCallback(() => {
        set([]);
    }, [set]);

    const remove = useCallback(() => {
        removeByKey(filter.id);
    }, [removeByKey, filter]);

    useEffect(() => {
        setFilter(filter.id, filter);
    }, [filter]);

    const value = state[filter.id]?.value ?? defaults.value;

    return useMemo(
        () => ({
            value,
            set,
            reset,
            remove,
        }),
        [value, set, reset, remove],
    );
};

type changeCallback = (state: FiltersState) => void;

export type FiltersControlRef = {
    setFilterValues: (values: [string, string[]][], shallow?: boolean) => void;
    getFilterValue: (id: string) => string[];
};

type FiltersPanelProps = {
    children: ReactNode;
    note?: ReactNode;
    count?: number;
    total?: number;
    loading?: boolean;
    onChange?: (state: FiltersState) => void;
};

const applyFilterValue = (filter: Filter, value: string[]): Filter => {
    return {
        ...filter,
        value: value.filter((id) => Boolean(filter.getValueDescriptor(id))),
    };
};

export const FiltersPanel = forwardRef<FiltersControlRef, FiltersPanelProps>(
    ({ note, count, total, loading, children, onChange }, ref) => {
        const [state, setState] = useState<FiltersState>({});
        const shallowUpdate = useRef(false);
        const onChangeRef = useRef<changeCallback>();

        const setFilter = useCallback((id: string, filter: Filter) => {
            setState((state) => ({
                ...state,
                [id]: applyFilterValue(filter, filter.value),
            }));
        }, []);

        const reset = useCallback(() => {
            setState((state) =>
                Object.keys(state).reduce((acum, id) => {
                    acum[id] = {
                        ...state[id],
                        value: [],
                    };

                    return acum;
                }, {} as FiltersState),
            );
        }, []);

        const remove = useCallback((id: string) => {
            setState((state) => {
                delete state[id];

                return {
                    ...state,
                };
            });
        }, []);

        useEffect(() => {
            onChangeRef.current = onChange;
        }, [onChange]);

        useEffect(() => {
            if (!shallowUpdate.current && onChangeRef.current) {
                onChangeRef.current(state);
            }

            if (shallowUpdate.current) {
                shallowUpdate.current = false;
            }
        }, [state]);

        const setFilterValues = useCallback((array: [string, string[]][], shallow = true) => {
            shallowUpdate.current = shallow;

            setState((state) => {
                const inject = array.reduce((acum, [id, value]) => {
                    const stateFilter = state[id];

                    if (stateFilter) {
                        return {
                            ...acum,
                            [id]: applyFilterValue(stateFilter, value),
                        };
                    }

                    return acum;
                }, {} as FiltersState);

                return {
                    ...state,
                    ...inject,
                };
            });
        }, []);

        const getFilterValue = useCallback(
            (id: string) => {
                return state[id]?.value || [];
            },
            [state],
        );

        useImperativeHandle(
            ref,
            () => ({
                setFilterValues,
                getFilterValue,
            }),
            [setFilterValues, getFilterValue],
        );

        const ctx = useMemo(
            () => ({
                setFilter,
                reset,
                state,
                remove,
                count,
                total,
            }),
            [count, total, setFilter, reset, remove, state],
        );

        return (
            <FiltersContext.Provider value={ctx}>
                <FiltersPanelContainer loading={loading}>
                    <FiltersPanelContent>{children}</FiltersPanelContent>
                </FiltersPanelContainer>
                {note}
            </FiltersContext.Provider>
        );
    },
);
