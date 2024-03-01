import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { Text } from '../Text/Text';

import { Radio } from './Radio';

export default {
    title: '@Harmony/Radio',
    component: Radio,
    argTypes: {
        onChange: { action: 'onChange' },
    },
    args: {
        readOnly: false,
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

export const Labeled: StoryFn<typeof Radio> = (args) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Radio {...args} name="radio1" label="Label 1" checked />
            <Radio {...args} name="radio2" label="Label 2" />
            <Radio {...args} name="radio3" label="Label 3" checked disabled />
            <Radio {...args} name="radio4" label="Label 4" disabled />
        </div>
    );
};

export const BigLabelInSmallContainer: StoryFn<typeof Radio> = (args) => {
    return (
        <div style={{ width: 400 }}>
            <Radio
                {...args}
                label={
                    <Text size="s" weight="regular" lines={2} ellipsis>
                        very longest criteria title for this goal user@taskany.org changed goal from verus nobis to
                        verus nobis as criteria 3 weeks ago
                    </Text>
                }
                defaultChecked
            />
            <Radio
                {...args}
                label={
                    <Text size="s" weight="regular" lines={2} ellipsis>
                        very longest criteria title for this goal user@taskany.org changed goal from verus nobis to
                        verus nobis as criteria 3 weeks ago
                    </Text>
                }
            />
        </div>
    );
};
