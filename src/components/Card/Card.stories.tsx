import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';

import { Card } from './Card';
import { CardActions } from './CardActions';
import { CardContent } from './CardContent';
import { CardInfo } from './CardInfo';

const meta: Meta<typeof Card> = {
    title: 'Card',
    component: Card,
};

export default meta;

type Story = StoryFn<typeof meta>;

export const Default: Story = () => (
    <Card style={{ width: '300px' }}>
        <CardInfo>Card Info</CardInfo>
        <CardContent>Card Content</CardContent>
        <CardActions>Card Actions</CardActions>
    </Card>
);
