import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { IconGridLayoutOutline, IconListUnorderedOutline, IconMessagePlusOutline } from '@taskany/icons';

import { Switch, SwitchControl } from './Switch';

const meta: Meta<typeof Switch> = {
    title: '@Harmony/Switch',
    component: Switch,
    args: {
        name: 'goalType',
    },
    argTypes: {
        onChange: { action: 'onChange' },
    },
};

export default meta;

type Story = StoryFn<typeof Switch>;

export const Default: Story = (props) => {
    return (
        <Switch {...props}>
            <SwitchControl text="Personal Goal" value="personal" />
            <SwitchControl text="Project Goal" value="project" />
            <SwitchControl text="Issue" value="issue" />
        </Switch>
    );
};

export const WithInitialValue: Story = (props) => {
    return <Default {...props} />;
};

WithInitialValue.args = {
    value: 'issue',
};

export const IconedContorls: Story = (props) => {
    return (
        <Switch {...props}>
            <SwitchControl iconLeft={<IconListUnorderedOutline size="s" />} text="List" value="list" />
            <SwitchControl iconLeft={<IconGridLayoutOutline size="s" />} text="Kanban" value="kanban" />
            <SwitchControl iconLeft={<IconMessagePlusOutline size="s" />} text="Updates" value="updates" />
        </Switch>
    );
};

export const IconedControlsWithInitialValue: Story = (props) => <IconedContorls {...props} />;

IconedControlsWithInitialValue.args = {
    value: 'list',
};

export const ControlsWithCounter: Story = (props) => {
    return (
        <Switch {...props}>
            <SwitchControl count={5} text="List" value="list" />
            <SwitchControl count={10} text="Kanban" value="kanban" />
            <SwitchControl count={7} text="Updates" value="updates" />
        </Switch>
    );
};
