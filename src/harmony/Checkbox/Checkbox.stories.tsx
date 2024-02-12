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
        <Checkbox {...args} defaultChecked />
        <Checkbox {...args} />
        <Checkbox {...args} defaultChecked disabled />
        <Checkbox {...args} disabled />
    </>
);

export const Labeled: StoryFn<typeof Checkbox> = (args) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Checkbox {...args} label="Label 1" defaultChecked />
            <Checkbox {...args} label="Label 2" />
            <Checkbox {...args} label="Label 3" defaultChecked disabled />
            <Checkbox {...args} label="Label 4" disabled />
        </div>
    );
};

export const Rounded: StoryFn<typeof Checkbox> = (args) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Checkbox {...args} view="rounded" label="Label 1" defaultChecked />
            <Checkbox {...args} view="rounded" label="Label 2" />
            <Checkbox {...args} view="rounded" label="Label 3" defaultChecked disabled />
            <Checkbox {...args} view="rounded" label="Label 4" disabled />
        </div>
    );
};
