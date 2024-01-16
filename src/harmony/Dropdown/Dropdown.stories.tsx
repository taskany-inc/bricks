import React, { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { nullable } from '../../utils';

import { Dropdown, DropdownPanel, DropdownTrigger } from './Dropdown';

type Story = StoryFn<typeof Dropdown>;

const story: Meta<typeof Dropdown> = {
    title: '@harmony/Dropdown',
    component: Dropdown,
    args: {},
};

export default story;

const itemStyles: React.CSSProperties = {
    width: '100%',
    whiteSpace: 'nowrap',
    wordBreak: 'break-all',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
};

const Item: React.FC<React.PropsWithChildren<{ muted?: boolean; onClick?: () => void }>> = ({
    muted,
    children,
    onClick,
}) => {
    return (
        <div onClick={onClick} style={{ color: muted ? 'var(--gray-700)' : 'var(--gray-300)', ...itemStyles }}>
            {children}
        </div>
    );
};

const List: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <div style={{ padding: '0 var(--gap-xs)' }}>{children}</div>;
};

const data = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: `Very longest item title ${i + 1}`,
}));

export const Default: Story = (args) => {
    const [selected, setSelected] = useState<string | null>(null);
    return (
        <Dropdown {...args}>
            <DropdownTrigger label="Item" style={{ width: '200px' }}>
                {nullable(
                    selected,
                    (value) => (
                        <Item>{value}</Item>
                    ),
                    <Item muted>No selected</Item>,
                )}
            </DropdownTrigger>
            <DropdownPanel style={{ width: '200px' }}>
                <List>
                    {data.map((val) => (
                        <Item
                            key={String(val.id)}
                            muted={selected !== val.title}
                            onClick={() => setSelected(val.title)}
                        >
                            {val.title}
                        </Item>
                    ))}
                </List>
            </DropdownPanel>
        </Dropdown>
    );
};

export const Outlined: Story = (args) => {
    const [selected, setSelected] = useState<string | null>(null);
    return (
        <Dropdown {...args}>
            <DropdownTrigger label="Item" view="outline" style={{ width: '200px' }}>
                {nullable(
                    selected,
                    (value) => (
                        <Item>{value}</Item>
                    ),
                    <Item muted>No selected</Item>,
                )}
            </DropdownTrigger>
            <DropdownPanel style={{ width: '200px' }}>
                <List>
                    {data.map((val) => (
                        <Item
                            key={String(val.id)}
                            muted={selected !== val.title}
                            onClick={() => setSelected(val.title)}
                        >
                            {val.title}
                        </Item>
                    ))}
                </List>
            </DropdownPanel>
        </Dropdown>
    );
};

export const DefaultWoLabel: Story = (args) => {
    const [selected, setSelected] = useState<string | null>(null);
    return (
        <Dropdown {...args}>
            <DropdownTrigger style={{ width: '200px' }}>
                {nullable(
                    selected,
                    (value) => (
                        <Item>{value}</Item>
                    ),
                    <Item muted>No selected</Item>,
                )}
            </DropdownTrigger>
            <DropdownPanel style={{ width: '200px' }}>
                <List>
                    {data.map((val) => (
                        <Item
                            key={String(val.id)}
                            muted={selected !== val.title}
                            onClick={() => setSelected(val.title)}
                        >
                            {val.title}
                        </Item>
                    ))}
                </List>
            </DropdownPanel>
        </Dropdown>
    );
};

export const OutlinedWoLabel: Story = (args) => {
    const [selected, setSelected] = useState<string | null>(null);
    return (
        <Dropdown {...args}>
            <DropdownTrigger view="outline" style={{ width: '200px' }}>
                {nullable(
                    selected,
                    (value) => (
                        <Item>{value}</Item>
                    ),
                    <Item muted>No selected</Item>,
                )}
            </DropdownTrigger>
            <DropdownPanel style={{ width: '200px' }}>
                <List>
                    {data.map((val) => (
                        <Item
                            key={String(val.id)}
                            muted={selected !== val.title}
                            onClick={() => setSelected(val.title)}
                        >
                            {val.title}
                        </Item>
                    ))}
                </List>
            </DropdownPanel>
        </Dropdown>
    );
};
