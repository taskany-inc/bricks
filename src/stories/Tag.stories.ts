import type { Meta, StoryObj } from '@storybook/react';

import { Tag } from '../components/Tag';

const meta: Meta<typeof Tag> = {
    title: 'Tag',
    component: Tag,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        title: 'title',
        description: 'description',
        size: 'm',
    },
};
