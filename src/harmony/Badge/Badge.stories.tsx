import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { IconExclamationCircleOutline, IconTargetOutline } from '@taskany/icons';

import { Dot } from '../Dot/Dot';

import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
    title: '@harmony/Badge',
    component: Badge,
};

export default meta;

export const Default: StoryObj<typeof Badge> = {
    render(props) {
        return (
            <div style={{ width: '350px' }}>
                <Badge
                    {...props}
                    text="Status"
                    iconLeft={
                        <Dot
                            size={props.size === 'xl' ? 'l' : props.size}
                            style={{ backgroundColor: 'currentcolor' }}
                        />
                    }
                />
                <br />
                <Badge {...props} text="Status" iconLeft={<IconTargetOutline size="s" />} />
                <br />
                <Badge
                    {...props}
                    ellipsis
                    lines={2}
                    text={`Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`}
                    iconLeft={<IconExclamationCircleOutline size="s" />}
                />
            </div>
        );
    },
};
