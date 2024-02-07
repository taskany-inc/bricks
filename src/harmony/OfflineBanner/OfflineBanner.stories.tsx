import type { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { OfflineBanner } from './OfflineBanner';

const meta: Meta<typeof OfflineBanner> = {
    title: '@harmony/OfflineBanner',
    component: OfflineBanner,
};

export default meta;

export const Default: StoryFn<typeof OfflineBanner> = (args) => {
    return (
        <div style={{ minWidth: '100rem', padding: 0 }}>
            <OfflineBanner {...args} text="You are currently offline. Check connection." />
        </div>
    );
};
