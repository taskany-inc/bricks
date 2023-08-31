import type { Meta, StoryObj } from '@storybook/react';

import { Spinner } from '../components/Spinner';

const meta: Meta<typeof Spinner> = {
    title: 'Spinner',
    component: Spinner,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        color: 'gray',
        size: 'm',
        noWrap: true,
        animationDuration: 2,
    },
};
