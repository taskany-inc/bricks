import React, { useCallback } from 'react';

import { nullable } from '../utils/nullable';

import { AutoComplete, AutoCompleteInput, AutoCompleteList } from './AutoComplete/AutoComplete';

interface FilterBaseProps<T> extends Omit<React.ComponentProps<typeof AutoComplete<T>>, 'onChange'> {
    inputProps?: React.ComponentProps<typeof AutoCompleteInput>;
    viewMode: 'split' | 'union';
    onChange: (items: string[]) => void;
    title?: string;
}

export function FilterBase<T>({ viewMode, onChange, keyGetter, children, title, ...props }: FilterBaseProps<T>) {
    const handleChange = useCallback(
        (items: T[]) => {
            onChange(items.map(keyGetter));
        },
        [onChange, keyGetter],
    );
    return (
        <AutoComplete {...props} keyGetter={keyGetter} onChange={handleChange}>
            {children}
            <AutoCompleteList selected={viewMode === 'split'} />
            {nullable(viewMode === 'split', () => (
                <AutoCompleteList filterSelected title={title} />
            ))}
        </AutoComplete>
    );
}
