import type { Meta, StoryObj } from '@storybook/react';

import { Input } from '../components/Input';

const meta: Meta<typeof Input> = {
    title: 'Input',
    component: Input,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        placeholder: 'type here...',
    },
};
