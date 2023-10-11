import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { IconAddressBookOutline, IconXSmallOutline } from '@taskany/icons';

import { Input } from './Input';

const meta: Meta<typeof Input> = {
    title: 'Input',
    component: Input,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};

export const WithIcons = {
    args: {
        iconLeft: <IconAddressBookOutline size="s" />,
        iconRight: <IconXSmallOutline size="xxs" />,
    },
};
