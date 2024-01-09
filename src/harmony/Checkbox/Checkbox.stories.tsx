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

export const Labeled: StoryFn<typeof Checkbox> = (args) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Checkbox {...args} label="Label 1" checked />
            <Checkbox {...args} label="Label 2" />
            <Checkbox {...args} label="Label 3" checked disabled />
            <Checkbox {...args} label="Label 4" disabled />
        </div>
    );
};
