import type { Meta, StoryObj } from '@storybook/react';

import { UserIcon } from '../components/Icon';

const meta: Meta<typeof UserIcon> = {
    title: 'Icon',
    component: UserIcon,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        size: 'l',
    },
};
