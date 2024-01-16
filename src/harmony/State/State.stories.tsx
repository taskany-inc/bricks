import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { State } from './State';

const meta: Meta = {
    title: '@harmony/State',
    component: State,
};

export default meta;

const stateVars = [
    ['var(--status-in-progress)', 'In Progress'],
    ['var(--status-draft)', 'Draft'],
    ['var(--status-failed)', 'Failed'],
    ['var(--status-finished)', 'Finished'],
    ['var(--status-at-risk)', 'At Risk'],
    ['var(--status-blocked)', 'Blocked'],
    ['var(--status-cancelled)', 'Cancelled'],
] as const;

export const Default: StoryObj<typeof State> = {
    render(props) {
        return (
            <>
                {stateVars.map(([color, title]) => (
                    <>
                        <State {...props} color={color} title={title} />
                        <br />
                    </>
                ))}
            </>
        );
    },
};
