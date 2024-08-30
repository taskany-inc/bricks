import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { IconAddOutline } from '@taskany/icons';

import { Separator } from '../Separator/Separator';
import { GlobalSearch } from '../GlobalSearch/GlobalSearch';
import { Select, SelectPanel, SelectTrigger } from '../Select/Select';
import { Text } from '../Text/Text';
import { Button } from '../Button/Button';

import { FiltersBar, FiltersBarCounter, FiltersBarItem, FiltersBarTitle, FiltersBarControlGroup } from './FiltersBar';

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
                    <Select
                        items={items}
                        mode="single"
                        renderItem={({ item }) => <Text>{item.title}</Text>}
                        onChange={() => {}}
                    >
                        <SelectTrigger
                            renderTrigger={({ ref, ...props }) => (
                                <Button text="Filter" iconLeft={<IconAddOutline size="xxs" />} ref={ref} {...props} />
                            )}
                        />
                        <SelectPanel placement="bottom" />
                    </Select>
                    <FiltersBarCounter total={3} counter={10} />
                </FiltersBarControlGroup>
            </FiltersBarItem>
            <FiltersBarItem>
                <GlobalSearch onChange={() => {}} />
            </FiltersBarItem>
        </FiltersBar>
    );
};
