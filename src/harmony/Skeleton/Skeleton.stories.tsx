import React from 'react';
import { Meta } from '@storybook/react';

import { TextSkeleton, LineSkeleton, RectSkeleton } from './Skeleton';

const meta: Meta<typeof TextSkeleton | typeof LineSkeleton | typeof RectSkeleton> = {
    title: '@harmony/Skeleton',
};

export default meta;

export const Default = () => (
    <div style={{ padding: 'var(--gap-m)', backgroundColor: 'var(--layer)' }}>
        <div style={{ display: 'flex', flexWrap: 'nowrap', width: '400px', gap: 'var(--gap-s)' }}>
            <RectSkeleton width="64px" height="64px" roundness="xl" />
            <div style={{ flex: '1' }}>
                <LineSkeleton size="ml" style={{ marginBottom: 'var(--gap-s)' }} />
                <TextSkeleton size="s" lines={5} />
            </div>
        </div>
    </div>
);
