import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { Dot } from '../Dot/Dot';

import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
    title: '@harmony/Badge',
    component: Badge,
};

export default meta;

export const Default: StoryObj<typeof Badge> = {
    args: {
        text: 'Status',
    },
    render(props) {
        return (
            <Badge
                {...props}
                iconLeft={
                    <Dot size={props.size === 'xl' ? 'l' : props.size} style={{ backgroundColor: 'currentcolor' }} />
                }
            />
        );
    },
};
