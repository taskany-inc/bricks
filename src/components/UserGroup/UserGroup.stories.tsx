import type { Meta, StoryObj } from '@storybook/react';

import { UserGroup } from './UserGroup';

const meta: Meta<typeof UserGroup> = {
    title: 'UserGroup',
    component: UserGroup,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        users: [
            { name: 'User1', email: 'user1@example.com' },
            { name: 'User2', email: 'user2@example.com' },
            { name: 'User3', email: 'user3@example.com' },
            { name: 'User4', email: 'user4@example.com' },
            { name: 'User5', email: 'user5@example.com' },
            { name: 'User6', email: 'user6@example.com' },
        ],
        limit: 4,
    },
};
