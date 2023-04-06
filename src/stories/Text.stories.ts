import type { Meta, StoryObj } from '@storybook/react';

import { Text } from '../components/Text';

const meta: Meta<typeof Text> = {
    title: 'Text',
    component: Text,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: 'text text text',
        size: 'xs',
        weight: 'bold',
    },
};
