import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { Dot } from './Dot';

const meta: Meta = {
    title: '@harmony/Dot',
    component: Dot,
};

export default meta;

export const Default: StoryObj<typeof Dot> = {
    render(props) {
        return <Dot {...props} />;
    },
};
