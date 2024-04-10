import React from 'react';
import { Meta } from '@storybook/react';
import { IconQuestionSolid, IconSearchOutline } from '@taskany/icons';

import { CircleIcon } from './CircleIcon';

const meta: Meta<typeof CircleIcon> = {
    title: '@harmony/CircleIcon',
    component: CircleIcon,
};

export default meta;

export const Default = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <CircleIcon icon={<IconQuestionSolid size="xxs" />} />
                <CircleIcon icon={<IconQuestionSolid size="s" />} size="s" />
                <CircleIcon icon={<IconQuestionSolid size="s" />} size="m" />
            </div>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <CircleIcon icon={<IconSearchOutline size="xxs" />} />
                <CircleIcon icon={<IconSearchOutline size="s" />} size="s" />
                <CircleIcon icon={<IconSearchOutline size="s" />} size="m" />
            </div>
        </div>
    );
};
