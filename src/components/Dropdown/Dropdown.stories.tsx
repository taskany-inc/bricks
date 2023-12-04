import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { MenuItem } from '../MenuItem';
import { Button } from '../Button/Button';

import { Dropdown } from './Dropdown';

type DropdownProps = React.ComponentPropsWithRef<typeof Dropdown>;
type Story = StoryObj<DropdownProps>;

export default {
    title: 'Dropdown',
    args: {
        items: [
            { id: 1, value: 'first' },
            { id: 2, value: 'second' },
            { id: 3, value: 'third' },
        ],
    },
    component: Dropdown,
} as Meta<DropdownProps>;

export const Default: Story = {
    args: {
        text: 'first',
        onSearchChange: undefined,
        renderTrigger(props) {
            return (
                <Button data-cy="control" text={props.value || props.text} onClick={props.onClick} ref={props.ref} />
            );
        },
        renderItem(props) {
            return (
                <MenuItem onClick={props.onClick} selected={props.cursor === props.index}>
                    {props.item.id} - {props.item.value}
                </MenuItem>
            );
        },
        renderItems: (children) => {
            return <div>{children}</div>;
        },
    },
};
