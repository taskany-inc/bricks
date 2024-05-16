import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';

import { Card, CardContent, CardInfo } from './Card';

const meta: Meta<typeof Card> = {
    title: '@harmony/Card',
    component: Card,
};

const Layout = ({ children, style }: { children: React.ReactNode; style?: Record<string, string> }) => (
    <div
        style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 260px)',
            gap: 36,
            marginBottom: 36,
            ...style,
        }}
    >
        {children}
    </div>
);

const colors = [
    {
        backgroundColor: 'var(--status-background-in-progress)',
        foregroundColor: 'var(--status-in-progress)',
    },
    {
        backgroundColor: 'var(--status-background-blocked)',
        foregroundColor: 'var(--status-blocked)',
    },
    {
        backgroundColor: 'var(--status-background-failed)',
        foregroundColor: 'var(--status-failed)',
        corner: true,
    },
    {
        backgroundColor: 'var(--status-background-finished)',
        foregroundColor: 'var(--status-finished)',
        corner: true,
    },
    {
        backgroundColor: 'var(--status-background-at-risk)',
        foregroundColor: 'var(--status-at-risk)',
        corner: true,
    },
    {
        backgroundColor: 'var(--status-background-cancelled)',
        foregroundColor: 'var(--status-cancelled)',
    },
];

export default meta;

export const Default: StoryFn<typeof meta> = () => {
    return (
        <Layout>
            <Card backgroundColor="var(--status-background-at-risk)">
                <CardContent view="transparent">Comment text</CardContent>
            </Card>
            <Card>
                <CardContent view="flat">Comment text</CardContent>
            </Card>
            <Card>
                <CardInfo>Header</CardInfo>
                <CardContent view="transparent">Comment text</CardContent>
            </Card>
            <Card>
                <CardInfo>Header</CardInfo>
                <CardContent>Comment text</CardContent>
            </Card>
            {colors.map(({ corner, ...props }, i) => (
                <Card key={i} {...props}>
                    <CardInfo corner={corner}>Header</CardInfo>
                    <CardContent>Comment text</CardContent>
                </Card>
            ))}
        </Layout>
    );
};
