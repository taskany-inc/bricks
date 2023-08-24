import type { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { ListView, ListViewItem } from '../components/ListView';
import { Table, TableRow, TableCell } from '../components/Table';

export default {
    title: 'ListView',
    component: ListView,
} as Meta<typeof ListView>;

const data = Array.from({ length: 10 }, (_, i) => ({
    id: String(i + 1),
    title: `Title for ${i + 1} record`,
}));

export const Default: StoryFn = () => {
    return (
        <ListView onClick={(item) => console.log(item)} onKeyboardClick={(item) => console.log(item)}>
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
