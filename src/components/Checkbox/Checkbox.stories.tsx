import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { Checkbox, CheckboxInput, CheckboxLabel } from './Checkbox';

export default {
    title: 'Checkbox',
    component: Checkbox,
    argTypes: {
        onClick: { action: 'onClick' },
    },
    args: {
        name: 'checkbox',
    },
} as Meta<typeof Checkbox>;

export const Default: StoryFn<typeof Checkbox> = (args) => (
    <>
        <Checkbox {...args}>
            <CheckboxLabel>Checkbox</CheckboxLabel>
            <CheckboxInput value="value" defaultChecked={false} />
        </Checkbox>
        <Checkbox {...args}>
            <CheckboxInput value="value" defaultChecked={true} />
            <CheckboxLabel>Checkbox</CheckboxLabel>
        </Checkbox>
    </>
);
