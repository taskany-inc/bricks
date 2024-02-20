import React, { ComponentProps, ReactNode, useState } from 'react';
import type { Meta } from '@storybook/react';

import { Button } from '../Button/Button';

import { Input as InputComponent } from './Input';

const meta: Meta<typeof InputComponent> = {
    title: '@Harmony/Input',
    component: InputComponent,
    args: {
        placeholder: 'Search or jump to...',
    },
};

export default meta;

const svgFilter = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
            d="M12.9167 11.6667H12.2583L12.025 11.4417C12.8699 10.4617 13.3343 9.21058 13.3333 7.91667C13.3333 6.84535 13.0157 5.7981 12.4205 4.90733C11.8253 4.01656 10.9793 3.3223 9.98954 2.91232C8.99977 2.50235 7.91066 2.39508 6.85993 2.60408C5.8092 2.81309 4.84404 3.32897 4.08651 4.08651C3.32897 4.84404 2.81309 5.8092 2.60408 6.85993C2.39508 7.91066 2.50235 8.99977 2.91232 9.98954C3.3223 10.9793 4.01656 11.8253 4.90733 12.4205C5.7981 13.0157 6.84535 13.3333 7.91667 13.3333C9.25834 13.3333 10.4917 12.8417 11.4417 12.025L11.6667 12.2583V12.9167L15.8333 17.075L17.075 15.8333L12.9167 11.6667ZM7.91667 11.6667C5.84167 11.6667 4.16667 9.99167 4.16667 7.91667C4.16667 5.84167 5.84167 4.16667 7.91667 4.16667C9.99167 4.16667 11.6667 5.84167 11.6667 7.91667C11.6667 9.99167 9.99167 11.6667 7.91667 11.6667Z"
            fill="currentColor"
        />
    </svg>
);

const svgClean = (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M9 3L3 9M9 9.00001L3 3.00001" stroke="#68686E" strokeLinecap="round" />
    </svg>
);

const svgPlus = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
            d="M8.00001 2.66675V13.3334M13.3333 8.00008L2.66667 8.00008"
            stroke="currentColor"
            strokeWidth="1.33333"
            strokeLinecap="round"
        />
    </svg>
);

const Input = ({ placeholder = 'Search or jump to...', ...rest }: ComponentProps<typeof InputComponent>) => (
    <InputComponent placeholder={placeholder} {...rest} />
);

const Title = ({ children }: { children: ReactNode }) => (
    <div style={{ fontSize: 36, marginBottom: 16, fontWeight: 'bold' }}>{children}</div>
);

const Text = ({ children }: { children: ReactNode }) => <span style={{ fontSize: 16 }}>{children}</span>;

const Layout = ({ children }: { children: ReactNode }) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, max-content)', gap: 36, marginBottom: 36 }}>
        {children}
    </div>
);

const InputsSizes = () => {
    return (
        <>
            <Title>
                Inputs sizes <Text>Default / Focus</Text>
            </Title>
            <Layout>
                <Input view="default" size="xs" />
                <Input view="success" size="xs" />
                <Input view="danger" size="xs" />
            </Layout>
            <Layout>
                <Input view="default" />
                <Input view="success" />
                <Input view="danger" />
            </Layout>
            <Layout>
                <Input view="default" size="m" />
                <Input view="success" size="m" />
                <Input view="danger" size="m" />
            </Layout>
        </>
    );
};

const Inputs = () => {
    return (
        <>
            <Title>
                Inputs <Text>Default / Focus</Text>
            </Title>
            <Layout>
                <Input view="default" />
                <Input view="success" />
                <Input view="danger" />
            </Layout>
            <Title>
                Inputs <Text>disabled</Text>
            </Title>
            <Layout>
                <Input disabled view="default" />
                <Input disabled view="success" />
                <Input disabled view="danger" />
            </Layout>
        </>
    );
};

const InputsOutlined = () => {
    return (
        <>
            <Title>
                Inputs Outlined <Text>Default / Focus / Disabled</Text>
            </Title>
            <Layout>
                <Input view="default" outline />
                <Input view="success" outline />
                <Input view="danger" outline />
                <Input view="default" disabled outline />
                <Input view="success" disabled outline />
                <Input view="danger" disabled outline />
            </Layout>
        </>
    );
};

const InputsWithIcons = () => {
    return (
        <>
            <Title>
                Inputs with icons <Text>Default / Focus</Text>
            </Title>
            <Layout>
                <Input view="default" iconLeft={svgFilter} />
                <Input view="default" value="Search" iconRight={svgClean} />
                <Input view="default" iconLeft={svgFilter} iconRight={svgClean} />
            </Layout>
        </>
    );
};

const InputGroups = () => {
    const [value, setValue] = useState('value');
    return (
        <>
            <Title>
                Input groups <Text>Default / Focus</Text>
            </Title>
            <Layout>
                <div style={{ display: 'flex' }}>
                    <Button text="Button" brick="right" />
                    <Input brick="left" iconLeft={svgFilter} outline />
                </div>
                <div style={{ display: 'flex' }}>
                    <Input brick="right" outline />
                    <Button text="Button" brick="left" />
                </div>
                <div style={{ display: 'flex' }}>
                    <Button text="Button" brick="right" />
                    <Input brick="center" outline />
                    <Button brick="left" iconRight={svgPlus} />
                </div>
            </Layout>
            <Layout>
                <div style={{ display: 'flex' }}>
                    <Input brick="right" outline />
                    <Input brick="center" iconLeft={svgFilter} outline />
                    <Input
                        brick="left"
                        value={value}
                        onChange={({ target }) => setValue(target.value)}
                        iconRight={svgPlus}
                        outline
                    />
                </div>
            </Layout>
        </>
    );
};

export const AllInputs = () => {
    return (
        <>
            <Inputs />
            <InputsSizes />
            <InputsOutlined />
            <InputsWithIcons />
            <InputGroups />
        </>
    );
};

export { Inputs, InputsSizes, InputsOutlined, InputsWithIcons, InputGroups };
