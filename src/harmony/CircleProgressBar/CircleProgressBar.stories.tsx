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
            <CircleProgressBar value={0} />
            <CircleProgressBar value={60} />
            <CircleProgressBar value={100} size="l" />
        </div>
    );
};
