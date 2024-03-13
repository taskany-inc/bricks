import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { Text } from '../Text/Text';

import { Checkbox } from './Checkbox';

export default {
    title: '@Harmony/Checkbox',
    component: Checkbox,
    argTypes: {
        onChange: { action: 'onChange' },
    },
    args: {
        name: 'checkbox',
        readOnly: false,
    },
} as Meta<typeof Checkbox>;

export const Default: StoryFn<typeof Checkbox> = (args) => (
    <>
        <Checkbox {...args} defaultChecked />
        <Checkbox {...args} />
        <Checkbox {...args} defaultChecked disabled />
        <Checkbox {...args} disabled />
    </>
);

export const Labeled: StoryFn<typeof Checkbox> = (args) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Checkbox {...args} label="Label 1" defaultChecked />
            <Checkbox {...args} label="Label 2" />
            <Checkbox {...args} label="Label 3" defaultChecked disabled />
            <Checkbox {...args} label="Label 4" disabled />
        </div>
    );
};

export const Rounded: StoryFn<typeof Checkbox> = (args) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Checkbox {...args} view="rounded" label="Label 1" defaultChecked />
            <Checkbox {...args} view="rounded" label="Label 2" />
            <Checkbox {...args} view="rounded" label="Label 3" defaultChecked disabled />
            <Checkbox {...args} view="rounded" label="Label 4" disabled />
        </div>
    );
};

export const BigLabelInSmallContainer: StoryFn<typeof Checkbox> = (args) => {
    return (
        <div style={{ width: 400 }}>
            <Checkbox
                {...args}
                view="rounded"
                lines={2}
                ellipsis
                strike
                label="very longest criteria title for this goal user@taskany.org changed goal from verus nobis to verus nobis as criteria 3 weeks ago"
                defaultChecked
            />
            <Checkbox
                {...args}
                view="default"
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
