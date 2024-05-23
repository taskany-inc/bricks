import type { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { Table, TableRow, TableCell } from '../Table/Table';
import { MenuItem } from '../MenuItem/MenuItem';

import { ListView, ListViewItem } from './ListView';

export default {
    title: '@harmony/ListView',
    component: ListView,
} as Meta<typeof ListView>;

const data = Array.from({ length: 10 }, (_, i) => ({
    id: String(i + 1),
    title: `Title for ${i + 1} record`,
}));

export const Default: StoryFn = (args) => {
    return (
        <>
            <ListView {...args}>
                <Table>
                    {data.slice(0, 5).map((item) => (
                        <ListViewItem
                            key={item.title}
                            renderItem={({ hovered, active, ...callbacks }) => (
                                <TableRow {...callbacks}>
                                    <TableCell>
                                        <MenuItem hovered={hovered || active}>{`${item.id}: ${item.title}`}</MenuItem>
                                    </TableCell>
                                </TableRow>
                            )}
                        />
                    ))}
                </Table>
                <br />
                <Table>
                    {data
                        .slice(5)
                        .reverse()
                        .map((item) => (
                            <ListViewItem
                                key={item.title}
                                renderItem={({ hovered, active, ...callbacks }) => (
                                    <TableRow {...callbacks}>
                                        <TableCell>
                                            <MenuItem
                                                hovered={hovered || active}
                                            >{`${item.id}: ${item.title}`}</MenuItem>
                                        </TableCell>
                                    </TableRow>
                                )}
                            />
                        ))}
                </Table>
            </ListView>
        </>
    );
};

Default.argTypes = {
    onClick: { action: 'onClick' },
    onKeyboardClick: { action: 'onKeyboardClick' },
};
