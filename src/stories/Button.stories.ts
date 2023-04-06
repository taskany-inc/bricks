import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../components/Button';

const meta: Meta<typeof Button> = {
    title: 'Button',
    component: Button,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        text: 'Primary',
        view: 'primary',
    },
};

export const Warning: Story = {
    args: {
        text: 'Warning',
        view: 'warning',
    },
};
