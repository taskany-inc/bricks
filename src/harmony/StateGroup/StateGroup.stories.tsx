import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';

import { StateGroup } from './StateGroup';

const meta: Meta<typeof StateGroup> = {
    title: '@Harmony/StateGroup',
    component: StateGroup,
};

export default meta;

type Story = StoryFn<typeof StateGroup>;

const stateItems = [
    { title: 'Draft', darkForeground: 'var(--status-draft)', lightForeground: 'var(--status-draft)' },
    { title: 'InProgress', darkForeground: 'var(--status-in-progress)', lightForeground: 'var(--status-in-progress)' },
    { title: 'Blocked', darkForeground: 'var(--status-blocked)', lightForeground: 'var(--status-blocked)' },
    { title: 'Finished', darkForeground: 'var(--status-finished)', lightForeground: 'var(--status-finished)' },
    { title: 'Failed', darkForeground: 'var(--status-failed)', lightForeground: 'var(--status-failed)' },
    { title: 'Canceled', darkForeground: 'var(--status-cancelled)', lightForeground: 'var(--status-cancelled)' },
    { title: 'AtRisk', darkForeground: 'var(--status-at-risk)', lightForeground: 'var(--status-at-risk)' },
];

export const Default: Story = (_, { globals }) => {
    const { theme } = globals;

    const prepared = stateItems.map((state) => ({ ...state, color: state[`${theme}Foreground`] }));

    return <StateGroup items={prepared} />;
};
