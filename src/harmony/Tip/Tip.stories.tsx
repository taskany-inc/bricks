import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { IconBulbOnOutline } from '@taskany/icons';

import { Tip } from './Tip';

const meta: Meta<typeof Tip> = {
    title: '@harmony/Tip',
    component: Tip,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => {
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Tip {...args} />
                <Tip view="warning" {...args} />
                <Tip view="danger" {...args} />
            </div>
        );
    },
    args: {
        title: 'Pro tip!',
        children: "Don't pretend just be",
        icon: <IconBulbOnOutline size="s" />,
    },
};
