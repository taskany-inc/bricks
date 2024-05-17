import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { UserGroup } from './UserGroup';

const meta: Meta<typeof UserGroup> = {
    title: '@harmony/UserGroup',
    component: UserGroup,
};

export default meta;

const users = [
    { name: 'User 1', email: 'user1@example.com' },
    { name: 'User 2', email: 'user2@example.com' },
    { name: 'User 3', email: 'user3@example.com' },
    { name: 'User 4', email: 'user4@example.com' },
    { name: 'User 5', email: 'user5@example.com' },
    { name: 'User 6', email: 'user6@example.com' },
];

export const Default: StoryObj<typeof UserGroup> = {
    render: (args) => (
        <div>
            <UserGroup {...args} size="m" />
            <UserGroup {...args} size="s" />
            <UserGroup {...args} size="xs" />
        </div>
    ),
    args: {
        users,
        showCount: 4,
        size: 's',
    },
};
