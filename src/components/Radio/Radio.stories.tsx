import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { RadioGroup, Radio, RadioLabel, RadioGroupLabel } from './Radio';

export default {
    title: 'Radio',
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
            <Radio value="one">
                <RadioLabel>One</RadioLabel>
            </Radio>
            <Radio value="two">
                <RadioLabel>Two</RadioLabel>
            </Radio>
            <Radio value="three">
                <RadioLabel>Three</RadioLabel>
            </Radio>
        </RadioGroup>
    );
};
