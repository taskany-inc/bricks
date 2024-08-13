import React from 'react';
import type { Meta } from '@storybook/react';

import { CircleProgressBar } from './CircleProgressBar';

const meta: Meta<typeof CircleProgressBar> = {
    title: '@Harmony/Circle Progress Bar',
    component: CircleProgressBar,
};

export default meta;

export const Circles = () => {
    return (
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <CircleProgressBar size="xxs" value={30} />
            <CircleProgressBar size="xs" value={30} />
            <CircleProgressBar size="s" value={0} />
            <CircleProgressBar size="m" value={60} />
            <CircleProgressBar size="l" value={100} />
        </div>
    );
};
