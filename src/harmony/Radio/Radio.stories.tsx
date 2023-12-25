import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { Radio } from './Radio';

export default {
    title: '@Harmony/Radio',
    component: Radio,
    argTypes: {
        onChange: { action: 'onChange' },
    },
} as Meta<typeof Radio>;

export const Default: StoryFn<typeof Radio> = (args) => (
    <>
        <Radio {...args} name="radio1" checked />
        <Radio {...args} name="radio2" />
        <Radio {...args} name="radio3" checked disabled />
        <Radio {...args} name="radio4" disabled />
    </>
);