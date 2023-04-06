import type { Meta, StoryObj } from '@storybook/react';

import { Link } from '../components/Link';

const meta: Meta<typeof Link> = {
    title: 'Link',
    component: Link,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: 'Link',
    },
};
