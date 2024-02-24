import React, { ComponentProps, useState } from 'react';
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

const Dropdown = ({ view, error }: { view?: ComponentProps<typeof DropdownTrigger>['view']; error?: boolean }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <DropdownProvider isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <DropdownTrigger onClick={() => setIsOpen(true)} view={view} error={error}>
                <Text size="s">Q4/2023</Text>
            </DropdownTrigger>
            <DropdownPanel width={200}>{text}</DropdownPanel>
        </DropdownProvider>
    );
};

const views = ['default', 'outline', 'fill'] as const;

export const Default: Story = () => {
    return (
        <>
            <Table>
                <TableRow>
                    {views.map((view) => (
                        <TableCell style={{ flex: 1 }}>
                            <Text weight="bold">{view}</Text>
                        </TableCell>
                    ))}
                </TableRow>
                <TableRow>
                    {views.map((view) => (
                        <TableCell>
                            <Dropdown view={view} />
                        </TableCell>
                    ))}
                </TableRow>
                <TableRow>
                    {views.map((view) => (
                        <TableCell>
                            <Dropdown view={view} error />
                        </TableCell>
                    ))}
                </TableRow>
            </Table>
        </>
    );
};
