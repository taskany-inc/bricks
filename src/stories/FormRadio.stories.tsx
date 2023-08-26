import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { FormRadio } from '../components/FormRadio';
import { FormRadioInput } from '../components/FormRadioInput';

const meta: Meta<typeof FormRadio> = {
    title: 'FormRadio',
    component: FormRadio,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => (
        <FormRadio label="Theme" name="theme" value={'light'} onChange={(v) => console.log(v)}>
            <FormRadioInput value="system" label="System" />
            <FormRadioInput value="dark" label="Dark" />
            <FormRadioInput value="light" label="Light" />
        </FormRadio>
    ),
};
