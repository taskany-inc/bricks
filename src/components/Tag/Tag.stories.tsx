import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Tag, TagCleanButton } from './Tag';

const meta: Meta<typeof Tag> = {
    title: 'Tag',
    component: Tag,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => {
        return (
            <Tag {...args}>
                <TagCleanButton onClick={action('onCleanButtonClick')} />
                Tag
            </Tag>
        );
    },
    args: {
        title: 'Tag description',
    },
    argTypes: {
        onClick: { action: 'onClick' },
    },
};
