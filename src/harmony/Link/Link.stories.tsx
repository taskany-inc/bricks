import React, { ReactNode } from 'react';
import type { Meta } from '@storybook/react';

import { Link } from './Link';

const meta: Meta<typeof Link> = {
    title: '@Harmony/Link',
    component: Link,
};

export default meta;

const Layout = ({ children }: { children: ReactNode }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>{children}</div>
);

const TitleLink = () => {
    return (
        <Link href="#">
            <h1>Title in GoalPreview</h1>
        </Link>
    );
};

const LinksInsideText = () => {
    return (
        <>
            <p>
                <Link href="#" view="inline">
                    Link in text
                </Link>{' '}
                - Lorem ipsum dolor sit amet{' '}
                <Link href="#" view="inline">
                    consectetur
                </Link>{' '}
                adipisicing elit. Libero accusamus quibusdam culpa{' '}
                <Link href="#" view="inline">
                    autem quas repellendus
                </Link>{' '}
                quod nihil beatae.
            </p>
            <p style={{ color: 'var(--text-secondary)' }}>
                <Link href="#" view="inline">
                    Link in text
                </Link>{' '}
                - Lorem ipsum dolor sit amet{' '}
                <Link href="#" view="inline">
                    consectetur
                </Link>{' '}
                adipisicing elit. Libero accusamus quibusdam culpa{' '}
                <Link href="#" view="inline">
                    autem quas repellendus
                </Link>{' '}
                quod nihil beatae.
            </p>
        </>
    );
};

const SecondaryLink = () => {
    return (
        <Link href="#" view="secondary">
            <div>Goal badge</div>
        </Link>
    );
};

export const AllLinks = () => {
    return (
        <Layout>
            <TitleLink />
            <LinksInsideText />
            <SecondaryLink />
        </Layout>
    );
};
