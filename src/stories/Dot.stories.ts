import type { Meta, StoryObj } from '@storybook/react';

import { Dot } from '../components/Dot';

const meta: Meta<typeof Dot> = {
    title: 'Dot',
    component: Dot,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        size: 'm',
        view: 'primary',
    },
};
