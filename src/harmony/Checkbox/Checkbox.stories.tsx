import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { Checkbox } from './Checkbox';

export default {
    title: '@Harmony/Checkbox',
    component: Checkbox,
    argTypes: {
        onChange: { action: 'onChange' },
    },
    args: {
        name: 'checkbox',
    },
} as Meta<typeof Checkbox>;

export const Default: StoryFn<typeof Checkbox> = (args) => (
    <>
        <Checkbox {...args} checked />
        <Checkbox {...args} />
        <Checkbox {...args} checked disabled />
        <Checkbox {...args} disabled />
    </>
);
