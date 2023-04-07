import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from '../components/Icon';

const meta: Meta<typeof Icon> = {
    title: 'Icon',
    component: Icon,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        size: 'l',
        type: 'calendar',
    },
};
