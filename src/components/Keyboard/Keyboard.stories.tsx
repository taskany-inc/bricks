import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Keyboard } from './Keyboard';

const meta: Meta<typeof Keyboard> = {
    title: 'Keyboard',
    component: Keyboard,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => {
        return <Keyboard {...args} />;
    },
    args: {
        command: true,
        shift: true,
        size: 'm',
    },
};
