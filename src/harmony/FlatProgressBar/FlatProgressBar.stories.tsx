import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { FlatProgressBar } from './FlatProgressBar';

const meta: Meta<typeof FlatProgressBar> = {
    title: '@harmony/FlatProgressBar',
    component: FlatProgressBar,
    args: {
        value: 45,
        view: 'pill',
        showValue: true,
    },
};

export default meta;

export const Default: StoryObj<typeof FlatProgressBar> = {
    render: (props) => {
        return (
            <div style={{ width: '200px' }}>
                <FlatProgressBar {...props} />
            </div>
        );
    },
};
