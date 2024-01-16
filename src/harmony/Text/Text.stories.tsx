import { Meta, StoryObj } from '@storybook/react';

import { Text } from './Text';

const meta: Meta = {
    title: '@harmony/Text',
    component: Text,
};

export default meta;

export const Default: StoryObj<typeof Text> = {
    args: {
        children: 'Simple text',
        size: 'xs',
        weight: 'bold',
        as: 'span',
    },
};
