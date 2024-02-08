import { Meta, StoryObj } from '@storybook/react';

import { Alert } from './Alert';

const meta: Meta = {
    title: '@harmony/Alert',
    component: Alert,
};

export default meta;

export const Default: StoryObj<typeof Alert> = {
    args: {
        view: 'default',
        text: 'The selected date has already passed',
    },
};
