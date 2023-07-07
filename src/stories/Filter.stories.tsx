import React, { useCallback, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';

import {
    FiltersCounterContainer,
    FiltersPanelContainer,
    FiltersPanelContent,
    FiltersSearchContainer,
    FiltersMenuContainer,
    FiltersApplied,
    FiltersAction,
} from '../components/FiltersContainers';
import { FiltersCounter } from '../components/FiltersCounter';
import { FiltersDropdown } from '../components/FiltersDropdown';
import { StarIcon } from '../components/Icon/StarIcon';
import { StarFilledIcon } from '../components/Icon/StarFilledIcon';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

const meta: Meta<typeof FiltersPanelContainer> = {
    title: 'FilterPanel',
    component: FiltersPanelContainer,
};

export default meta;

type Story = StoryObj<typeof meta>;

const FilterWrapper = styled.div`
    min-width: 750px;
`;

const filterItems = [
    {
        id: '1',
        data: 'Value 1',
    },
    {
        id: '2',
        data: 'Value 2',
    },
    {
        id: '3',
        data: 'Value 3',
    },
    {
        id: '4',
        data: 'Value 4',
    },
];

const findId = (id: string) => filterItems.find((item) => item.id === id);

export const FilterPanel: Story = ({ loading = false }) => {
    const FilterATitle = 'Filter A';
    const FilterBTitle = 'Filter B';
    const [filterA, setFilterA] = useState<string[]>([]);
    const [filterB, setFilterB] = useState<string[]>([]);
    const [star, toggleStart] = useState(false);

    const onFilterStar = useCallback(() => {
        toggleStart((val) => !val);
    }, []);

    const onClear = useCallback(() => {
        setFilterA([]);
        setFilterB([]);
    }, []);

    return (
        <FilterWrapper>
            <FiltersPanelContainer loading={loading}>
                <FiltersPanelContent>
                    <FiltersSearchContainer>
                        <Input placeholder="Search" />
                    </FiltersSearchContainer>
                    <FiltersCounterContainer>
                        <FiltersCounter total={100} counter={24} />
                    </FiltersCounterContainer>
                    <FiltersMenuContainer>
                        <FiltersDropdown
                            text={FilterATitle}
                            value={filterA}
                            items={filterItems}
                            onChange={setFilterA}
                        />
                        <FiltersDropdown
                            text={FilterBTitle}
                            value={filterB}
                            items={filterItems}
                            onChange={setFilterB}
                        />
                        <FiltersAction onClick={onFilterStar}>
                            {star ? <StarFilledIcon size="s" noWrap /> : <StarIcon size="s" noWrap />}
                        </FiltersAction>
                    </FiltersMenuContainer>
                    <Button text="Clear" onClick={onClear} />
                </FiltersPanelContent>
            </FiltersPanelContainer>
            <FiltersApplied>
                {filterA.length ? `${FilterATitle}: ${filterA.map((id) => findId(id)?.data).join(', ')}; ` : null}
                {filterB.length ? `${FilterBTitle}: ${filterB.map((id) => findId(id)?.data).join(', ')}; ` : null}
            </FiltersApplied>
        </FilterWrapper>
    );
};

FilterPanel.args = {
    loading: false,
};
