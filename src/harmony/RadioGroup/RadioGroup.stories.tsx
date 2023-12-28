import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { RadioGroup, RadioControl, RadioGroupLabel } from './RadioGroup';

export default {
    title: '@harmony/RadioGroup',
    component: RadioGroup,
    argTypes: { onChange: { action: 'onChange' } },
    args: {
        name: 'radio',
        value: 'two',
    },
} as Meta<typeof RadioGroup>;

export const Default: StoryFn<typeof RadioGroup> = (args) => {
    return (
        <RadioGroup {...args}>
            <RadioGroupLabel>Radio Group</RadioGroupLabel>
            <RadioControl value="one">One</RadioControl>
            <RadioControl value="two">Two</RadioControl>
            <RadioControl value="three" disabled>
                Three
            </RadioControl>
        </RadioGroup>
    );
};
