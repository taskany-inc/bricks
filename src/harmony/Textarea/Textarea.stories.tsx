import React, { ComponentProps, ReactNode } from 'react';
import type { Meta } from '@storybook/react';

import { Textarea as TextareaComponent } from '../Textarea/Textarea';

const meta: Meta<typeof TextareaComponent> = {
    title: '@Harmony/Textarea',
    component: TextareaComponent,
};

export default meta;

const Textarea = ({ placeholder = 'Search or jump to...', ...rest }: ComponentProps<typeof TextareaComponent>) => (
    <TextareaComponent placeholder={placeholder} {...rest} />
);

const Title = ({ children }: { children: ReactNode }) => (
    <div style={{ fontSize: 36, marginBottom: 16, fontWeight: 'bold' }}>{children}</div>
);

const Text = ({ children }: { children: ReactNode }) => <span style={{ fontSize: 16 }}>{children}</span>;

const Layout = ({ children, style }: { children: ReactNode; style?: Record<string, string> }) => (
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

const Textareas = () => {
    return (
        <>
            <Title>
                Textarea <Text>Default / Focus</Text>
            </Title>
            <Layout>
                <Textarea view="default" />
                <Textarea view="success" />
                <Textarea view="danger" />
            </Layout>
            <Title>
                Textarea <Text>disabled</Text>
            </Title>
            <Layout>
                <Textarea disabled view="default" />
                <Textarea disabled view="success" />
                <Textarea disabled view="danger" />
            </Layout>
            <Title>
                Textarea borderless <Text>Default / Focus / Disabled</Text>
            </Title>
            <Layout>
                <Textarea view="default" outline={false} />
                <Textarea view="success" outline={false} />
                <Textarea view="danger" outline={false} />
                <Textarea view="default" outline={false} disabled />
                <Textarea view="success" outline={false} disabled />
                <Textarea view="danger" outline={false} disabled />
            </Layout>
        </>
    );
};

const TextareaFlat = () => {
    return (
        <>
            <Title>
                Textarea brick <Text>Default / Focus</Text>
            </Title>
            <Layout
                style={{ gridTemplateColumns: 'repeat(4, 260px)', padding: '16px', background: 'var(--text-color)' }}
            >
                <code style={{ color: 'var(--background)' }}>brick="top"</code>
                <Textarea view="default" brick="top" />
                <Textarea view="success" brick="top" />
                <Textarea view="danger" brick="top" />

                <code style={{ color: 'var(--background)' }}>brick="bottom"</code>
                <Textarea view="default" brick="bottom" />
                <Textarea view="success" brick="bottom" />
                <Textarea view="danger" brick="bottom" />

                <code style={{ color: 'var(--background)' }}>brick="center"</code>
                <Textarea view="default" brick="center" />
                <Textarea view="success" brick="center" />
                <Textarea view="danger" brick="center" />
            </Layout>
        </>
    );
};

export const AllTextareas = () => {
    return (
        <>
            <Textareas />
            <TextareaFlat />
        </>
    );
};

export { Textareas, TextareaFlat };
