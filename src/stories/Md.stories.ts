import type { Meta, StoryObj } from '@storybook/react';

import { Md } from '../components/Md';

const meta: Meta<typeof Md> = {
    title: 'Md',
    component: Md,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: 'text text text',
    },
};
