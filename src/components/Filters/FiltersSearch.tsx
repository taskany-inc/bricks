import React, { FC, useMemo } from 'react';
import { debounce } from 'throttle-debounce';
import styled from 'styled-components';

import Input from '../Input';

import { useFilter } from './FiltersPanel';

export const FiltersSearchContainer = styled.div`
    width: 16.67%;
`;

const SEARCH_DELAY = 200;

export const FiltersSearch: FC<{ title: string; id: string; placeholder?: string }> = ({ id, title, placeholder }) => {
    const { value, set } = useFilter({
        title,
        id,
        value: [],
        getValueDescriptor: (id) => ({ name: id, id }),
    });

    const onSearch = useMemo(
        () =>
            debounce(SEARCH_DELAY, (e: React.ChangeEvent<HTMLInputElement>) => {
                const id = e.target.value;

                set(id ? [id] : []);
            }),
        [set],
    );

    return <Input placeholder={placeholder} defaultValue={value[0]} onChange={onSearch} />;
};
