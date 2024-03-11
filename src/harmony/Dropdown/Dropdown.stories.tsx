import React, { ComponentProps, ReactNode, useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { Text } from '../Text/Text';
import { Table, TableCell, TableRow } from '../Table/Table';

import { Dropdown as DropdownProvider, DropdownPanel, DropdownTrigger } from './Dropdown';

type Story = StoryFn<typeof DropdownProvider>;

const story: Meta<typeof DropdownProvider> = {
    title: '@harmony/Dropdown',
    component: DropdownProvider,
    args: {},
};

export default story;

const text =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. In asperiores laboriosam, ipsum esse cum dolorem exercitationem molestiae.';

const Dropdown = ({
    view,
    error,
    disabled,
    readOnly,
    arrow,
}: {
    view?: ComponentProps<typeof DropdownTrigger>['view'];
    error?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    arrow?: boolean;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <DropdownProvider isOpen={isOpen} onClose={() => setIsOpen(false)} arrow={arrow}>
            <DropdownTrigger
                onClick={() => setIsOpen(true)}
                view={view}
                error={error}
                disabled={disabled}
                readOnly={readOnly}
            >
                <Text size="s">Q4/2023</Text>
            </DropdownTrigger>
            <DropdownPanel width={200}>{text}</DropdownPanel>
        </DropdownProvider>
    );
};

const Cell = ({ children }: { children?: ReactNode }) => <TableCell style={{ flex: 1 }}>{children}</TableCell>;

const views = ['default', 'outline', 'fill'] as const;

export const Default: Story = () => {
    return (
        <>
            <Table style={{ gap: 20 }}>
                <TableRow>
                    <Cell></Cell>
                    {views.map((view) => (
                        <Cell>
                            <Text weight="bold">{view}</Text>
                        </Cell>
                    ))}
                </TableRow>
                <TableRow>
                    <Cell>only view</Cell>
                    {views.map((view) => (
                        <Cell>
                            <Dropdown view={view} arrow />
                        </Cell>
                    ))}
                </TableRow>
                <TableRow>
                    <Cell>readOnly</Cell>
                    {views.map((view) => (
                        <Cell>
                            <Dropdown view={view} readOnly arrow />
                        </Cell>
                    ))}
                </TableRow>
                <TableRow>
                    <Cell>disabled</Cell>
                    {views.map((view) => (
                        <Cell>
                            <Dropdown view={view} disabled arrow />
                        </Cell>
                    ))}
                </TableRow>
                <TableRow>
                    <Cell>error</Cell>
                    {views.map((view) => (
                        <Cell>
                            <Dropdown view={view} error arrow />
                        </Cell>
                    ))}
                </TableRow>
                <TableRow>
                    <Cell>error + readOnly</Cell>
                    {views.map((view) => (
                        <Cell>
                            <Dropdown view={view} error readOnly arrow />
                        </Cell>
                    ))}
                </TableRow>
                <TableRow>
                    <Cell>error + disabled</Cell>
                    {views.map((view) => (
                        <Cell>
                            <Dropdown view={view} error disabled arrow />
                        </Cell>
                    ))}
                </TableRow>
            </Table>
        </>
    );
};
