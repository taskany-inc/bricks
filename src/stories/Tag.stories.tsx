import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Tag, TagCleanButton } from '../components/Tag';

const meta: Meta<typeof Tag> = {
    title: 'Tag',
    component: Tag,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => {
        return (
            <Tag title="Tag description" onClick={action('onClick')}>
                <TagCleanButton onClick={action('onCleanButtonClick')} />
                Tag
            </Tag>
        );
    },
};
