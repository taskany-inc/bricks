import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { IconBulbOnOutline } from '@taskany/icons';

import { Tip } from './Tip';

const meta: Meta<typeof Tip> = {
    title: 'Tip',
    component: Tip,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => {
        return (
            <Tip {...args} icon={<IconBulbOnOutline size="s" />}>
                Don't pretend just be.
            </Tip>
        );
    },
    args: {
        title: 'Pro tip!',
    },
};
