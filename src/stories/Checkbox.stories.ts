import { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from '../components/Checkbox';

export default {
    title: 'Checkbox',
    component: Checkbox,
    argTypes: {
        onClick: { action: 'onClick' },
    },
} as Meta<typeof Checkbox>;

export const Default: StoryObj<typeof Checkbox> = {
    args: {
        name: 'checkbox',
        label: 'Checkbox',
        value: 'value',
        checked: true,
    },
};
