/* eslint-disable no-console */
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { IconAddOutline } from '@taskany/icons';

import { ListView, ListViewItem } from '../ListView/ListView';

import { MenuItem } from './MenuItem';

const meta: Meta = {
    title: '@harmony/MenuItem',
    component: MenuItem,
};

export default meta;

export const Default: StoryObj<typeof MenuItem> = {
    args: {
        iconLeft: <IconAddOutline size="s" />,
        children: 'hello world',
    },
};

const data = ['Comments', 'Status', 'Criteria', 'Description', 'Participants'];

export const DefaultList = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <ListView onKeyboardClick={console.log}>
                {data.map((item) => (
                    <ListViewItem
                        value={item}
                        key={item}
                        renderItem={({ active, ...props }) => (
                            <MenuItem {...props} onClick={() => console.log(item)} hovered={active}>
                                {item}
                            </MenuItem>
                        )}
                    />
                ))}
            </ListView>
        </div>
    );
};

export const SelectableList = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <ListView onKeyboardClick={console.log}>
                {data.map((item, index) => (
                    <ListViewItem
                        value={item}
                        key={item}
                        renderItem={({ active, ...props }) => (
                            <MenuItem
                                selectable
                                selected={[1].includes(index)}
                                {...props}
                                onClick={() => console.log(item)}
                                hovered={active}
                            >
                                {item}
                            </MenuItem>
                        )}
                    />
                ))}
            </ListView>
        </div>
    );
};

export const MultipleSelectableList = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <ListView onKeyboardClick={console.log}>
                {data.map((item, index) => (
                    <ListViewItem
                        value={item}
                        key={item}
                        renderItem={({ active, ...props }) => (
                            <MenuItem
                                multiple
                                selectable
                                selected={[0, 2, 3].includes(index)}
                                {...props}
                                onClick={() => console.log(item)}
                                hovered={active}
                            >
                                {item}
                            </MenuItem>
                        )}
                    />
                ))}
            </ListView>
        </div>
    );
};
