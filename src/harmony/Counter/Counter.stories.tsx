import { Meta } from '@storybook/react';

import { Counter } from './Counter';

const meta: Meta<typeof Counter> = {
    title: '@harmony/Counter',
    component: Counter,
    args: {
        view: 'default',
        size: 's',
        count: 10,
    },
};

export default meta;

export const Default = {};
