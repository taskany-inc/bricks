import type { Meta, StoryObj } from '@storybook/react';

import { Badge } from '../components/Badge';

const meta: Meta<typeof Badge> = {
    title: 'Badge',
    component: Badge,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: '5',
    },
};
