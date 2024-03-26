import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { Badge } from '../Badge/Badge';

import { Spinner } from './Spinner';

const meta: Meta<typeof Spinner> = {
    title: '@harmony/Spinner',
    component: Spinner,
};

export default meta;

export const Default: StoryObj<typeof Spinner> = {
    args: {
        size: 's',
        animationDuration: 3,
    },

    render(props) {
        return <Spinner {...props} />;
    },
};

export const InBadge: StoryObj<typeof Spinner> = {
    render() {
        return <Badge iconLeft={<Spinner size="s" />} size="m" text="Please wait ..." weight="thin" />;
    },
};
