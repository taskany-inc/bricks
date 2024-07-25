import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { UserGroup } from './UserGroup';

const meta: Meta<typeof UserGroup> = {
    title: '@harmony/UserGroup',
    component: UserGroup,
};

export default meta;

const userPic =
    'https://secure.gravatar.com/avatar/51d3c935ea5453b2915e6180a9944c11/?default=https%3A%2F%2Fvanillicon.com%2F8fff907b6502f8011495fb154ec1c0a2_200.png&rating=g&size=560';

const users = [
    { name: 'User 1', email: 'user1@example.com' },
    { name: 'User 2', email: 'user2@example.com' },
    { name: 'User 3', email: 'user3@example.com' },
    { name: 'User 4', email: 'user4@example.com' },
    { name: 'User 5', email: 'user5@example.com' },
    { name: 'User 6', email: 'user6@example.com' },
].map((user) => ({ ...user, image: userPic }));

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
