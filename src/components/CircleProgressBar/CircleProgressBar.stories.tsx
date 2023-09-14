import type { Meta, StoryObj } from '@storybook/react';

import { CircleProgressBar } from './CircleProgressBar';

const meta: Meta<typeof CircleProgressBar> = {
    title: 'Circle Progress Bar',
    component: CircleProgressBar,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        value: 100,
        size: 'm',
    },
};
