import type { Meta, StoryObj } from '@storybook/react';

import { Block } from '../components/Block';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta: Meta<typeof Block> = {
    title: 'Example/Button',
    component: Block,
    tags: ['autodocs'],
    argTypes: {
        text: {},
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Primary: Story = {
    args: {
        text: 'Test',
        color: 'red',
    },
};
