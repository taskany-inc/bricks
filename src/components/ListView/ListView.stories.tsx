import type { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { Table, TableRow, TableCell } from '../Table/Table';

import { ListView, ListViewItem } from './ListView';

export default {
    title: 'ListView',
    component: ListView,
} as Meta<typeof ListView>;

const data = Array.from({ length: 10 }, (_, i) => ({
    id: String(i + 1),
    title: `Title for ${i + 1} record`,
}));

export const Default: StoryFn = (args) => {
    return (
        <ListView {...args}>
            <Table width={200} gap={10}>
                {data.slice(0, 5).map((item) => (
                    <ListViewItem
                        key={item.title}
                        renderItem={({ hovered, active, ...callbacks }) => (
                            <TableRow interactive focused={hovered || active} gap={10} {...callbacks}>
                                <TableCell width="2ch" justify="end">
                                    {item.id}
                                </TableCell>
                                <TableCell>{item.title}</TableCell>
                            </TableRow>
                        )}
                    />
                ))}
            </Table>
            <br />
            <Table width={200} gap={10}>
                {data
                    .slice(5)
                    .reverse()
                    .map((item) => (
                        <ListViewItem
                            key={item.title}
                            renderItem={({ hovered, active, ...callbacks }) => (
                                <TableRow interactive focused={hovered || active} gap={10} {...callbacks}>
                                    <TableCell width="2ch" justify="end">
                                        {item.id}
                                    </TableCell>
                                    <TableCell>{item.title}</TableCell>
                                </TableRow>
                            )}
                        />
                    ))}
            </Table>
        </ListView>
    );
};

Default.argTypes = {
    onClick: { action: 'onClick' },
    onKeyboardClick: { action: 'onKeyboardClick' },
};
