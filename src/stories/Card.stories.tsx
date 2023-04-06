import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Card as CardRoot, CardActions, CardContent, CardInfo } from '../components/Card';

const meta: Meta<typeof CardRoot> = {
    title: 'Card',
    component: CardRoot,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Card: Story = () => (
    <CardRoot style={{ width: '300px' }}>
        <CardInfo>Card Info</CardInfo>
        <CardContent>Card Content</CardContent>
        <CardActions>Card Actions</CardActions>
    </CardRoot>
);

Card.args = {};
