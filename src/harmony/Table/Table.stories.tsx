import React, { ComponentProps, ReactNode, useState } from 'react';
import type { Meta } from '@storybook/react';
import { IconMessageTextOutline } from '@taskany/icons';

import { Text } from '../Text/Text';
import { Badge } from '../Badge/Badge';
import { State } from '../State/State';
import { User } from '../User/User';
import { UserGroup } from '../UserGroup/UserGroup';
import { CircleProgressBar } from '../CircleProgressBar/CircleProgressBar';
import { TreeView, TreeViewElement, TreeViewNode } from '../TreeView/TreeView';
import { nullable } from '../../utils';
import { Dropdown, DropdownPanel, DropdownTrigger } from '../Dropdown/Dropdown';

import { TableRow, Table, TableCell } from './Table';

const StateDropdown = (props: ComponentProps<typeof State>) => {
    const [selected, setSelected] = useState<string | undefined>(props.title);
    return (
        <Dropdown>
            <DropdownTrigger style={{ width: '130px' }}>
                {nullable(
                    selected,
                    (value) => (
                        <State color="var(--state-stroke)" title={value} />
                    ),
                    <div style={{ color: 'var(--gray-700)' }}>No selected</div>,
                )}
            </DropdownTrigger>
            <DropdownPanel style={{ width: '130px' }}>
                <div>
                    {['Draft', ...Array.from({ length: 5 }, (_, index) => `State ${index + 1}`)].map((state) => (
                        <div
                            key={state}
                            style={{ color: selected !== state ? 'var(--gray-700)' : undefined }}
                            onClick={() => setSelected(state)}
                        >
                            <State color="var(--state-stroke)" title={state} />
                        </div>
                    ))}
                </div>
            </DropdownPanel>
        </Dropdown>
    );
};

const titles = [
    'Lorem, ipsum dolor sit amet consectetur.',
    'Lorem, ipsum dolor.',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    'Lorem ipsum dolor sit amet.',
];
const participants = [
    { email: 'hello@world.ru', image: 'https://helloworld.ru', name: 'Adam Sandler' },
    { email: 'hello@world.ru', image: 'https://helloworld.ru', name: 'Adam Sandler' },
    { email: 'hello@world.ru', image: 'https://helloworld.ru', name: 'Adam Sandler' },
    { email: 'hello@world.ru', image: 'https://helloworld.ru', name: 'Adam Sandler' },
];
const estimates = ['Q4/2024', 'Q1/2025', '2023', '05/04/2024'];
const priorities = ['Low', 'Medium', 'Hight', 'Highest'];

const data = Array.from({ length: 4 }, () => [
    {
        content: <Text weight="bold">{titles[Math.floor(Math.random() * titles.length)]}</Text>,
        style: {
            marginRight: 'auto',
            flexShrink: 1,
            minWidth: 400,
            width: '100%',
        },
        head: '+ New goal',
    },
    {
        content: (
            <Badge
                color="inherit"
                size="s"
                weight="regular"
                text={`${Math.floor(Math.random() * 10) || 1}`}
                iconLeft={<IconMessageTextOutline size="s" />}
            />
        ),
        width: 40,
    },
    {
        content: <StateDropdown color="var(--state-stroke)" title="Draft" />,
        width: 130,
        head: 'State',
    },
    {
        content: <User name="email@example.ru" src="https://helloworld.ru" email="Madelaine Petsch" inheritColor />,
        width: 172,
        head: 'Owner',
    },
    {
        content: nullable(participants, (users) => <UserGroup users={users} />),
        width: 100,
        head: 'Participants',
    },
    {
        content: (
            <Text size="s" color="inherit">
                {estimates[Math.floor(Math.random() * estimates.length)]}
            </Text>
        ),
        width: 95,
        head: 'Estimate',
    },
    {
        content: (
            <Text size="s" color="inherit">
                {priorities[Math.floor(Math.random() * priorities.length)]}
            </Text>
        ),
        width: 90,
        head: 'Priority',
    },
    {
        content: nullable(Math.floor(Math.random() * 100), (weight) => <CircleProgressBar value={weight} />),
        width: 24,
        head: 'Weight',
    },
]);

const heads = data.map((row) => row.map(({ head, width, style }) => ({ head, width, style })))[0];

const meta: Meta<typeof Table> = {
    title: '@Harmony/Table',
    component: Table,
};

export default meta;

const StyledTableRow = ({ children }: { children: ReactNode }) => {
    return (
        <TableRow
            style={{
                padding: 'var(--gap-s) var(--gap-sm)',
                background: 'var(--layer)',
                border: '1px solid var(--gray-900)',
                borderRadius: 'var(--radius-m)',
                minHeight: 'var(--gap-l)',
            }}
        >
            {children}
        </TableRow>
    );
};

export const TableWithHead = () => {
    return (
        <>
            <Table>
                <TableRow style={{ padding: 'var(--gap-s) var(--gap-sm)' }}>
                    {heads.map(({ head, width, style }) => (
                        <TableCell key={head} width={width} style={style}>
                            {head}
                        </TableCell>
                    ))}
                </TableRow>
                {data.map((row) => (
                    <StyledTableRow>
                        {row.map(({ content, style, width }, index) => (
                            <TableCell key={index} style={style} width={width}>
                                {content}
                            </TableCell>
                        ))}
                    </StyledTableRow>
                ))}
            </Table>
        </>
    );
};

export const CollapsibleTable = ({ depth = 3 }) => {
    const generateTree = (currentDepth: number) => {
        if (currentDepth === 0) {
            return null;
        }

        return (
            <TreeViewNode
                interactive
                title={
                    <div style={{ padding: 'var(--gap-s) var(--gap-sm)' }}>
                        <Text size="l" weight="bold" as="span">
                            Project {depth - currentDepth + 1}
                        </Text>
                    </div>
                }
            >
                <Table>
                    {data.map((row, index) => (
                        <TreeViewElement key={index}>
                            <StyledTableRow>
                                {row.map(({ content, style, width }, index) => (
                                    <TableCell key={index} style={style} width={width}>
                                        {content}
                                    </TableCell>
                                ))}
                            </StyledTableRow>
                        </TreeViewElement>
                    ))}

                    {generateTree(currentDepth - 1)}
                </Table>
            </TreeViewNode>
        );
    };

    return <TreeView>{generateTree(depth)}</TreeView>;
};
