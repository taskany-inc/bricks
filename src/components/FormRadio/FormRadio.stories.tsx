import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { FormRadio } from './FormRadio';
import { FormRadioInput } from './FormRadioInput';

const meta: Meta<typeof FormRadio> = {
    title: 'FormRadio',
    component: FormRadio,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => (
        <FormRadio {...args}>
            <FormRadioInput value="system" label="System" />
            <FormRadioInput value="dark" label="Dark" />
            <FormRadioInput value="light" label="Light" />
        </FormRadio>
    ),
    argTypes: {
        onChange: { action: 'onChange' },
    },
    args: {
        label: 'Theme',
        name: 'theme',
        value: 'ligth',
    },
};
