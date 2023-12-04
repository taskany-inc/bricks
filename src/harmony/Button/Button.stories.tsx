import React, { ReactNode, useState } from 'react';
import type { Meta } from '@storybook/react';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
    title: '@Harmony/Button',
    component: Button,
    argTypes: {},
};

export default meta;

const svgFilter = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
            d="M13.1111 2H2.88889C2.39797 2 2 2.39797 2 2.88889V2.96514C2 3.20089 2.09365 3.42698 2.26035 3.59368L5.73965 7.07298C5.90635 7.23968 6 7.46578 6 7.70152V11.4506C6 11.7873 6.19022 12.0951 6.49137 12.2457L9.6784 13.8392C9.82615 13.9131 10 13.8056 10 13.6404V7.70152C10 7.46578 10.0937 7.23968 10.2603 7.07298L13.7397 3.59368C13.9064 3.42698 14 3.20089 14 2.96514V2.88889C14 2.39797 13.602 2 13.1111 2Z"
            stroke="currentColor"
            strokeLinecap="round"
        />
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
const svgPlusCircle = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
            d="M8.00001 5.33325V7.99992M8.00001 7.99992V10.6666M8.00001 7.99992H10.6667M8.00001 7.99992H5.33334M14.6667 7.99992C14.6667 11.6818 11.6819 14.6666 8.00001 14.6666C4.31811 14.6666 1.33334 11.6818 1.33334 7.99992C1.33334 4.31802 4.31811 1.33325 8.00001 1.33325C11.6819 1.33325 14.6667 4.31802 14.6667 7.99992Z"
            stroke="currentColor"
            strokeWidth="1.33333"
            strokeLinecap="round"
        />
    </svg>
);
const svgTrash = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
            d="M2.66666 3.24992C2.25244 3.24992 1.91666 3.5857 1.91666 3.99992C1.91666 4.41413 2.25244 4.74992 2.66666 4.74992V3.24992ZM13.3333 4.74992C13.7475 4.74992 14.0833 4.41413 14.0833 3.99992C14.0833 3.5857 13.7475 3.24992 13.3333 3.24992V4.74992ZM4.58332 3.99992C4.58332 4.41413 4.91911 4.74992 5.33332 4.74992C5.74754 4.74992 6.08332 4.41413 6.08332 3.99992H4.58332ZM9.91666 3.99992C9.91666 4.41413 10.2524 4.74992 10.6667 4.74992C11.0809 4.74992 11.4167 4.41413 11.4167 3.99992H9.91666ZM11.9167 3.99322L11.845 12.017L13.345 12.0304L13.4166 4.00661L11.9167 3.99322ZM9.92846 13.9166H5.99999V15.4166H9.92846V13.9166ZM2.58332 3.99992V11.9999H4.08332V3.99992H2.58332ZM2.66666 4.74992H3.33332V3.24992H2.66666V4.74992ZM3.33332 4.74992H12.6667V3.24992H3.33332V4.74992ZM12.6667 4.74992H13.3333V3.24992H12.6667V4.74992ZM6.08332 3.70362C6.08332 2.88932 6.85596 2.08325 7.99999 2.08325V0.583252C6.1985 0.583252 4.58332 1.89968 4.58332 3.70362H6.08332ZM7.99999 2.08325C9.14402 2.08325 9.91666 2.88932 9.91666 3.70362H11.4167C11.4167 1.89968 9.80148 0.583252 7.99999 0.583252V2.08325ZM4.58332 3.70362V3.99992H6.08332V3.70362H4.58332ZM9.91666 3.70362V3.99992H11.4167V3.70362H9.91666ZM5.99999 13.9166C4.94145 13.9166 4.08332 13.0585 4.08332 11.9999H2.58332C2.58332 13.8869 4.11302 15.4166 5.99999 15.4166V13.9166ZM11.845 12.017C11.8357 13.0689 10.9803 13.9166 9.92846 13.9166V15.4166C11.8035 15.4166 13.3282 13.9054 13.345 12.0304L11.845 12.017Z"
            fill="currentColor"
        />
    </svg>
);
const svgCopy = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
            d="M11.2 11.9999C11.9467 11.9999 12.3201 11.9999 12.6053 11.8546C12.8562 11.7268 13.0602 11.5228 13.188 11.2719C13.3333 10.9867 13.3333 10.6133 13.3333 9.86658V3.46659C13.3333 2.71985 13.3333 2.34648 13.188 2.06126C13.0602 1.81038 12.8562 1.60641 12.6053 1.47858C12.3201 1.33325 11.9467 1.33325 11.2 1.33325H7.46667C6.71994 1.33325 6.34657 1.33325 6.06135 1.47858C5.81047 1.60641 5.60649 1.81038 5.47866 2.06126C5.33334 2.34648 5.33334 2.71985 5.33334 3.46659M4.80001 14.6666H8.53334C9.28008 14.6666 9.65344 14.6666 9.93866 14.5213C10.1895 14.3934 10.3935 14.1895 10.5213 13.9386C10.6667 13.6534 10.6667 13.28 10.6667 12.5333V6.13325C10.6667 5.38651 10.6667 5.01315 10.5213 4.72793C10.3935 4.47705 10.1895 4.27307 9.93866 4.14524C9.65344 3.99992 9.28008 3.99992 8.53334 3.99992H4.80001C4.05327 3.99992 3.6799 3.99992 3.39468 4.14524C3.1438 4.27307 2.93983 4.47705 2.812 4.72793C2.66667 5.01315 2.66667 5.38651 2.66667 6.13325V12.5333C2.66667 13.28 2.66667 13.6534 2.812 13.9386C2.93983 14.1895 3.1438 14.3934 3.39468 14.5213C3.6799 14.6666 4.05327 14.6666 4.80001 14.6666Z"
            stroke="currentColor"
            strokeWidth="1.5"
        />
    </svg>
);

const Title = ({ children }: { children: ReactNode }) => (
    <div style={{ fontSize: 36, marginBottom: 16, fontWeight: 'bold' }}>{children}</div>
);

const Text = ({ children }: { children: ReactNode }) => <span style={{ fontSize: 16 }}>{children}</span>;

const Layout = ({
    children,
    gridTemplateColumns = 'repeat(5, min-content)',
    marginBottom = 60,
    gap = 36,
}: {
    children: ReactNode;
    gridTemplateColumns?: string;
    marginBottom?: number;
    gap?: number;
}) => <div style={{ display: 'grid', gridTemplateColumns, gap, marginBottom, alignItems: 'center' }}>{children}</div>;

const ButtonSizes = () => {
    return (
        <>
            <Title>
                Buttons sizes <Text>Default / Hover / Active / Focus</Text>
            </Title>
            <Layout gridTemplateColumns="repeat(3, min-content)" marginBottom={18} gap={18}>
                <Button text="Button" view="primary" iconLeft={svgFilter} size="xs" />
                <Button text="Button" view="primary" iconLeft={svgFilter} />
                <Button text="Button" view="primary" iconLeft={svgFilter} size="m" />
                <Button text="Button" view="primary" iconRight={svgFilter} size="xs" />
                <Button text="Button" view="primary" iconRight={svgFilter} />
                <Button text="Button" view="primary" iconRight={svgFilter} size="m" />
            </Layout>
            <Layout gridTemplateColumns="repeat(3, min-content)" marginBottom={18} gap={18}>
                <Button text="Button" view="default" size="xs" />
                <Button text="Button" view="default" />
                <Button text="Button" view="default" size="m" />
            </Layout>
            <Layout gridTemplateColumns="repeat(3, min-content)" marginBottom={18} gap={18}>
                <Button view="default" size="xs" iconLeft={svgFilter} />
                <Button view="default" iconLeft={svgFilter} />
                <Button view="default" size="m" iconLeft={svgFilter} />
            </Layout>
            <Layout gridTemplateColumns="repeat(3, min-content)" marginBottom={18} gap={18}>
                <div style={{ display: 'flex' }}>
                    <Button text="Button" view="default" brick="right" size="xs" />
                    <Button view="default" brick="left" iconLeft={svgFilter} size="xs" />
                </div>
                <div style={{ display: 'flex' }}>
                    <Button text="Button" view="primary" brick="right" />
                    <Button view="primary" brick="left" iconLeft={svgPlusCircle} />
                </div>
                <div style={{ display: 'flex' }}>
                    <Button text="Button" view="danger" brick="right" size="m" />
                    <Button view="danger" brick="left" iconLeft={svgTrash} size="m" />
                </div>
            </Layout>
            <Layout gridTemplateColumns="repeat(3, min-content)" marginBottom={18} gap={18}>
                <div style={{ display: 'flex' }}>
                    <Button view="default" brick="right" iconLeft={svgFilter} size="xs" />
                    <Button text="Button" view="default" brick="left" size="xs" />
                </div>
                <div style={{ display: 'flex' }}>
                    <Button view="primary" brick="right" iconLeft={svgPlusCircle} />
                    <Button text="Button" view="primary" brick="left" />
                </div>
                <div style={{ display: 'flex' }}>
                    <Button view="danger" brick="right" iconLeft={svgTrash} size="m" />
                    <Button text="Button" view="danger" brick="left" size="m" />
                </div>
            </Layout>
            <Layout gridTemplateColumns="repeat(3, min-content)" marginBottom={18} gap={18}>
                <div style={{ display: 'flex' }}>
                    <Button view="primary" brick="right" iconLeft={svgPlusCircle} size="xs" />
                    <Button text="Button" view="primary" brick="center" size="xs" />
                    <Button view="primary" brick="left" iconRight={svgPlusCircle} size="xs" />
                </div>
                <div style={{ display: 'flex' }}>
                    <Button view="danger" brick="right" iconLeft={svgTrash} />
                    <Button text="Button" view="danger" brick="center" />
                    <Button view="danger" brick="left" iconRight={svgTrash} />
                </div>
                <div style={{ display: 'flex' }}>
                    <Button view="warning" brick="right" iconLeft={svgCopy} size="m" />
                    <Button text="Button" view="warning" brick="center" size="m" />
                    <Button view="warning" brick="left" iconRight={svgCopy} size="m" />
                </div>
            </Layout>
            <Layout gridTemplateColumns="repeat(3, 1fr)">
                <Button text="Button" view="default" iconLeft={svgFilter} iconRight={svgFilter} size="xs" />
                <Button text="Button" view="primary" iconLeft={svgPlus} iconRight={svgPlus} />
                <Button text="Button" view="danger" iconLeft={svgPlusCircle} iconRight={svgPlusCircle} size="m" />
            </Layout>
        </>
    );
};

const Buttons = () => {
    return (
        <>
            <Title>
                Buttons <Text>Default / Hover / Active / Focus</Text>
            </Title>
            <Layout>
                <Button text="Button" view="default" />
                <Button text="Button" view="primary" />
                <Button text="Button" view="ghost" />
                <Button text="Button" view="danger" />
                <Button text="Button" view="warning" />
            </Layout>
            <Title>
                Buttons <Text>disabled</Text>
            </Title>
            <Layout marginBottom={36}>
                <Button text="Button" disabled view="default" />
                <Button text="Button" disabled view="primary" />
                <Button text="Button" disabled view="ghost" />
                <Button text="Button" disabled view="danger" />
                <Button text="Button" disabled view="warning" />
            </Layout>
            <Layout>
                <Button disabled view="default" iconLeft={svgFilter} />
                <Button disabled view="primary" iconLeft={svgPlus} />
                <Button disabled view="ghost" iconLeft={svgPlusCircle} />
                <Button disabled view="danger" iconLeft={svgTrash} />
                <Button disabled view="warning" iconLeft={svgTrash} />
            </Layout>
        </>
    );
};

const ButtonsWithIcons = () => {
    return (
        <>
            <Title>
                Buttons with icons <Text>Default / Hover / Active / Focus</Text>
            </Title>
            <Layout marginBottom={36}>
                <Button text="Button" view="default" iconLeft={svgFilter} />
                <Button text="Button" view="primary" iconLeft={svgPlus} />
                <Button text="Button" view="ghost" iconLeft={svgPlusCircle} />
                <Button text="Button" view="danger" iconLeft={svgTrash} />
                <Button text="Button" view="warning" iconLeft={svgCopy} />
                <Button text="Button" view="default" iconRight={svgFilter} />
                <Button text="Button" view="primary" iconRight={svgPlus} />
                <Button text="Button" view="ghost" iconRight={svgPlusCircle} />
                <Button text="Button" view="danger" iconRight={svgTrash} />
                <Button text="Button" view="warning" iconRight={svgCopy} />
            </Layout>
            <Layout>
                <Button text="Button" view="default" iconLeft={svgFilter} iconRight={svgFilter} />
                <Button text="Button" view="primary" iconLeft={svgPlus} iconRight={svgPlus} />
                <Button text="Button" view="ghost" iconLeft={svgPlusCircle} iconRight={svgPlusCircle} />
                <Button text="Button" view="danger" iconLeft={svgTrash} iconRight={svgTrash} />
                <Button text="Button" view="warning" iconLeft={svgCopy} iconRight={svgCopy} />
            </Layout>
        </>
    );
};

const ButtonsStretched = () => {
    return (
        <>
            <Title>
                Buttons stretched <Text>Default / Hover / Active / Focus</Text>
            </Title>
            <Layout gridTemplateColumns="repeat(2, 1fr)">
                <Button text="Button" view="default" iconLeft={svgFilter} iconRight={svgFilter} />
                <Button text="Button" view="primary" iconLeft={svgPlus} iconRight={svgPlus} />
                <Button text="Button" view="ghost" iconLeft={svgPlusCircle} iconRight={svgPlusCircle} />
                <Button text="Button" view="danger" iconLeft={svgTrash} iconRight={svgTrash} />
                <Button text="Button" view="warning" iconLeft={svgCopy} iconRight={svgCopy} />
            </Layout>
        </>
    );
};

const OnyIcons = () => {
    return (
        <>
            <Title>
                Ony icons <Text>Default / Hover / Active / Focus</Text>
            </Title>
            <Layout gridTemplateColumns="repeat(6, min-content)">
                <div>iconLeft</div>
                <Button view="default" iconLeft={svgFilter} />
                <Button view="primary" iconLeft={svgPlus} />
                <Button view="ghost" iconLeft={svgPlusCircle} />
                <Button view="danger" iconLeft={svgTrash} />
                <Button view="warning" iconLeft={svgTrash} />
                <div>iconRight</div>
                <Button view="default" iconRight={svgFilter} />
                <Button view="primary" iconRight={svgPlus} />
                <Button view="ghost" iconRight={svgPlusCircle} />
                <Button view="danger" iconRight={svgTrash} />
                <Button view="warning" iconRight={svgCopy} />
            </Layout>
        </>
    );
};

const ButtonGroups = () => {
    return (
        <>
            <Title>
                Button groups <Text>Default / Hover / Active / Focus</Text>
            </Title>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, min-content)', gap: 36, marginBottom: 80 }}>
                <div style={{ display: 'flex' }}>
                    <Button text="Button" view="default" brick="right" />
                    <Button view="default" brick="left" iconLeft={svgFilter} />
                </div>
                <div style={{ display: 'flex' }}>
                    <Button text="Button" view="primary" brick="right" />
                    <Button view="primary" brick="left" iconLeft={svgPlusCircle} />
                </div>
                <div style={{ display: 'flex' }}>
                    <Button text="Button" view="danger" brick="right" />
                    <Button view="danger" brick="left" iconLeft={svgTrash} />
                </div>
                <div style={{ display: 'flex' }}>
                    <Button text="Button" view="warning" brick="right" />
                    <Button view="warning" brick="left" iconLeft={svgCopy} />
                </div>
                <div style={{ display: 'flex' }}>
                    <Button view="default" brick="right" iconLeft={svgFilter} />
                    <Button text="Button" view="default" brick="left" />
                </div>
                <div style={{ display: 'flex' }}>
                    <Button view="primary" brick="right" iconLeft={svgPlusCircle} />
                    <Button text="Button" view="primary" brick="left" />
                </div>
                <div style={{ display: 'flex' }}>
                    <Button view="danger" brick="right" iconLeft={svgTrash} />
                    <Button text="Button" view="danger" brick="left" />
                </div>
                <div style={{ display: 'flex' }}>
                    <Button view="warning" brick="right" iconLeft={svgCopy} />
                    <Button text="Button" view="warning" brick="left" />
                </div>
                <div style={{ display: 'flex' }}>
                    <Button view="default" brick="right" iconLeft={svgFilter} />
                    <Button text="Button" view="default" brick="center" />
                    <Button view="default" brick="left" iconRight={svgFilter} />
                </div>
                <div style={{ display: 'flex' }}>
                    <Button view="primary" brick="right" iconLeft={svgPlusCircle} />
                    <Button text="Button" view="primary" brick="center" />
                    <Button view="primary" brick="left" iconRight={svgPlusCircle} />
                </div>
                <div style={{ display: 'flex' }}>
                    <Button view="danger" brick="right" iconLeft={svgTrash} />
                    <Button text="Button" view="danger" brick="center" />
                    <Button view="danger" brick="left" iconRight={svgTrash} />
                </div>
                <div style={{ display: 'flex' }}>
                    <Button view="warning" brick="right" iconLeft={svgCopy} />
                    <Button text="Button" view="warning" brick="center" />
                    <Button view="warning" brick="left" iconRight={svgCopy} />
                </div>
            </div>
        </>
    );
};

const ButtonsChecked = () => {
    const [checked, setChecked] = useState({ 1: false, 2: true, 3: true });
    return (
        <>
            <Title>Button checked</Title>
            <Layout gridTemplateColumns="repeat(3, min-content)">
                <Button
                    onClick={() => setChecked((prev) => ({ ...prev, 1: !prev[1] }))}
                    text="Button"
                    size="xs"
                    iconLeft={svgFilter}
                    view={checked[1] ? 'checked' : undefined}
                />
                <Button
                    onClick={() => setChecked((prev) => ({ ...prev, 2: !prev[2] }))}
                    text="Button"
                    size="s"
                    iconRight={svgPlus}
                    view={checked[2] ? 'checked' : undefined}
                />
                <Button
                    onClick={() => setChecked((prev) => ({ ...prev, 3: !prev[3] }))}
                    text="Button"
                    size="m"
                    iconLeft={svgPlusCircle}
                    view={checked[3] ? 'checked' : undefined}
                    iconRight={svgPlusCircle}
                />
            </Layout>
        </>
    );
};

export const AllButtons = () => {
    return (
        <>
            <ButtonSizes />
            <Buttons />
            <ButtonsWithIcons />
            <ButtonsStretched />
            <OnyIcons />
            <ButtonGroups />
            <ButtonsChecked />
        </>
    );
};

export { ButtonSizes, Buttons, ButtonsWithIcons, ButtonsStretched, OnyIcons, ButtonGroups, ButtonsChecked };
