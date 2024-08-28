import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { Button } from '../Button/Button';
import { Separator } from '../Separator/Separator';
import { GlobalSearch } from '../GlobalSearch/GlobalSearch';

import {
    FiltersBar,
    FiltersBarCounter,
    AddFilterDropdown,
    FiltersBarItem,
    FiltersBarTitle,
    FiltersBarControlGroup,
} from './FiltersBar';

const story: Meta<typeof FiltersBar> = {
    title: '@harmony/FiltersBar',
    component: FiltersBar,
    args: {},
};

export default story;

const items = [
    {
        id: '1',
        title: 'filter 1',
    },
    {
        id: '2',
        title: 'filter 2',
    },
    {
        id: '3',
        title: 'filter 3',
    },
];

export const FilterBar: StoryFn<typeof FiltersBar> = () => {
    return (
        <FiltersBar style={{ width: '1000px' }}>
            <FiltersBarItem>
                <FiltersBarTitle>Title</FiltersBarTitle>
            </FiltersBarItem>
            <Separator />
            <FiltersBarItem layout="fill">
                <FiltersBarControlGroup>
                    <AddFilterDropdown title="Add filter" items={items} onChange={() => {}} />
                    <FiltersBarCounter total={3} counter={10} />
                </FiltersBarControlGroup>
            </FiltersBarItem>
            <FiltersBarItem>
                <GlobalSearch onChange={() => {}} />
            </FiltersBarItem>
            <FiltersBarItem></FiltersBarItem>
        </FiltersBar>
    );
};
