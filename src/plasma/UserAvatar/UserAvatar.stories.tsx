import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { UserAvatar } from './UserAvatar';

const meta: Meta<typeof UserAvatar> = {
    title: '@plasma/UserAvatar',
    component: UserAvatar,
};

export default meta;

export const Default: StoryObj<typeof UserAvatar> = {
    render: (args) => (
        <div>
            <UserAvatar {...args} />
        </div>
    ),
    args: {
        size: 'xxl',
        email: 'john_doe_77@taskany-inc.io',
        domain: 'www.gravatar.com',
        name: 'John Doe',
    },
};
