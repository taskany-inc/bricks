import React, { forwardRef, useRef, useState } from 'react';
import { Meta } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import { IconDeniedOutline, IconEdit1Outline } from '@taskany/icons';

import { Button } from '../Button/Button';
import { TableRow } from '../Table/Table';
import { Tooltip } from '../Tooltip/Tooltip';

import { getTableComponents } from './DataTable';

const names = [
    'John Doe',
    'Alan Wake',
    'Luke SkyWalker',
    'Darth Wader',
    'Pinoccio',
    'Christopher Lamberth',
    'Tim Lambesis',
    'Sam Carter Jr.',
    'Chester Bennington',
    'Spencer Chamberline',
];

const employment = ['Control GMBH', 'Gran Turismo LLC', 'Witcher Inc', 'Horizon LLC'];

const createLogin = (name: string) => {
    const [first, last] = name.split(' ');

    if (last == null) {
        return first;
    }

    return `${first[0]}_${last}`;
};

const data = Array.from(names, (name) => ({
    name,
    email: name
        .toLowerCase()
        .replace(' ', '_')
        .concat('_', String(Math.floor(Math.random() * 10)).padStart(2, '0'), '@', 'yahoo.com'),

    login: createLogin(name.toLowerCase()),
    employment: employment[Math.floor(Math.random() * employment.length)],
    head: names[Math.floor(Math.random() * names.length)],
}));

const { DataTable, DataTableColumn } = getTableComponents<typeof data>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ClickableRow = forwardRef<HTMLDivElement, React.ComponentProps<any>>((props, ref) => {
    return (
        <a href={`#${props.item.name}`} style={{ display: 'contents', cursor: 'pointer' }}>
            <TableRow {...props} ref={ref} />
        </a>
    );
});

const meta: Meta = {
    title: '@harmony/DataTable',
    component: DataTable,
};

export default meta;

const RowControls: React.FC<(typeof data)[number]> = (props) => {
    const handlers = actions({
        onDenied: props.name,
        onEdit: props.name,
    });

    const wrapOnClick =
        (handler: (...args: any[]) => void): React.MouseEventHandler<HTMLButtonElement> =>
        (event) => {
            event.preventDefault();
            handler(props);
        };
    return (
        <>
            <Button
                iconLeft={
                    <IconDeniedOutline
                        size="s"
                        onClick={wrapOnClick(handlers.onDenied)}
                        style={{ marginRight: '0.25em' }}
                    />
                }
            />
            <Button iconLeft={<IconEdit1Outline size="s" onClick={wrapOnClick(handlers.onEdit)} />} />
        </>
    );
};

export const Default = () => {
    const [sorting, setSorting] = useState<React.ComponentProps<typeof DataTable>['sorting']>([
        { key: 'name', dir: 'asc' },
    ]);
    return (
        <div style={{ maxWidth: '600px', minWidth: '400px', width: '100%' }}>
            <DataTable data={data} sorting={sorting} onSort={(val) => setSorting([val])}>
                <DataTableColumn name="name" value="name" title="Person" width="100px" fixed lines={1} />
                <DataTableColumn name="email" value="email" width="120px" title="Email" lines={1} />
                <DataTableColumn name="login" width="120px" value="login" title="Login" />
                <DataTableColumn name="employment" width="150px" value="employment" title="Employment" />
                <DataTableColumn name="head" value="head" title="Head" width="10ch" />
                <DataTableColumn name="date" title="Date of creation" width="100px">
                    {new Date().toLocaleDateString()}
                </DataTableColumn>
                <DataTableColumn
                    sortable={false}
                    fixed="right"
                    name="actions"
                    title="Actions"
                    width="10ch"
                    renderCell={RowControls}
                />
            </DataTable>
        </div>
    );
};

export const BigTable = () => {
    return (
        <div style={{ maxWidth: '1000px', width: '100%' }}>
            <DataTable data={data.concat(data.concat(data))} sorting={[{ key: 'name', dir: 'asc' }]}>
                <DataTableColumn name="name" value="name" title="Person" width="100px" fixed />
                <DataTableColumn name="email" value="email" width="120px" title="Email" />
                <DataTableColumn name="login" width="120px" value="login" title="Login" sortable={false} />
                <DataTableColumn name="employment" width="120px" value="employment" title="Employment" />
                <DataTableColumn name="head" value="head" title="Head" width="10ch" />
                <DataTableColumn name="email1" value="email" width="120px" title="Email" />
                <DataTableColumn name="login1" width="120px" value="login" title="Login" />
                <DataTableColumn name="employment1" width="120px" value="employment" title="Employment" />
                <DataTableColumn name="head1" value="head" title="Head" width="10ch" />
                <DataTableColumn name="email2" value="email" width="120px" title="Email" />
                <DataTableColumn name="login2" width="120px" value="login" title="Login" />
                <DataTableColumn name="employment2" width="120px" value="employment" title="Employment" />
                <DataTableColumn name="head2" value="head" title="Head" width="10ch" />
                <DataTableColumn name="email3" value="email" width="120px" title="Email" />
                <DataTableColumn name="login3" width="120px" value="login" title="Login" />
                <DataTableColumn name="employment3" width="120px" value="employment" title="Employment" />
                <DataTableColumn name="head3" value="head" title="Head" width="10ch" />
                <DataTableColumn name="email4" value="email" width="120px" title="Email" />
                <DataTableColumn name="login4" width="120px" value="login" title="Login" />
                <DataTableColumn name="employment4" width="120px" value="employment" title="Employment" />
                <DataTableColumn name="head4" value="head" title="Head" width="10ch" />
                <DataTableColumn
                    fixed="right"
                    name="actions"
                    title="Actions"
                    width="10ch"
                    sortable={false}
                    renderCell={RowControls}
                ></DataTableColumn>
            </DataTable>
        </div>
    );
};

export const ClickableRows = () => (
    <div style={{ maxWidth: '600px', minWidth: '400px', width: '100%' }}>
        <DataTable data={data} sorting={[]} rowComponent={ClickableRow}>
            <DataTableColumn name="name" value="name" title="Person" width="100px" fixed />
            <DataTableColumn name="email" value="email" width="120px" title="Email" fixed />
            <DataTableColumn name="login" width="120px" value="login" title="Login" />
            <DataTableColumn name="employment" width="150px" value="employment" title="Employment" />
            <DataTableColumn fixed="right" name="head" value="head" title="Head" width="10ch" />
            <DataTableColumn
                sortable={false}
                fixed="right"
                name="actions"
                title="Actions"
                width="10ch"
                renderCell={RowControls}
            />
        </DataTable>
    </div>
);

const InteractiveTooltip: React.FC<{ title: string; tooltipText: string }> = ({ title, tooltipText }) => {
    const ref = useRef<HTMLSpanElement>(null);

    return (
        <>
            <span ref={ref}>{title}</span>
            <Tooltip reference={ref} maxWidth={200} placement="right" offset={[2, 10]} arrow={false}>
                {tooltipText}
            </Tooltip>
        </>
    );
};

export const WithCustomColumnHeader = () => {
    const [sorting, setSorting] = useState<React.ComponentProps<typeof DataTable>['sorting']>([
        { key: 'name', dir: 'asc' },
    ]);

    return (
        <div style={{ maxWidth: '600px', minWidth: '400px', width: '100%' }}>
            <DataTable data={data} sorting={sorting} onSort={(val) => setSorting([val])}>
                <DataTableColumn name="name" value="name" title="Person" width="100px" fixed lines={1} />
                <DataTableColumn
                    name="email"
                    value="email"
                    width="120px"
                    title={<InteractiveTooltip title="Email" tooltipText="Personal Email" />}
                    lines={1}
                />
                <DataTableColumn name="login" width="120px" value="login" title="Login" />
                <DataTableColumn name="employment" width="150px" value="employment" title="Employment" />
                <DataTableColumn name="head" value="head" title="Head" width="10ch" />
                <DataTableColumn
                    fixed="right"
                    name="date"
                    title={<InteractiveTooltip title="Date of creation" tooltipText="Date of creation" />}
                    width="100px"
                >
                    {new Date().toLocaleDateString()}
                </DataTableColumn>
                <DataTableColumn
                    sortable={false}
                    fixed="right"
                    name="actions"
                    title="Actions"
                    width="10ch"
                    renderCell={RowControls}
                />
            </DataTable>
        </div>
    );
};

export const FluidColumns = () => {
    const [sorting, setSorting] = useState<React.ComponentProps<typeof DataTable>['sorting']>([
        { key: 'name', dir: 'asc' },
    ]);
    return (
        <div style={{ maxWidth: '600px', minWidth: '400px', width: 'auto' }}>
            <DataTable data={data} sorting={sorting} onSort={(val) => setSorting([val])}>
                <DataTableColumn name="name" value="name" title="Person" width="100px" fixed lines={1} />
                <DataTableColumn
                    name="email"
                    value="email"
                    width="25%"
                    title={<InteractiveTooltip title="Email" tooltipText="Personal Email" />}
                    lines={1}
                />
                <DataTableColumn name="login" width="20%" value="login" title="Login" />
                <DataTableColumn name="employment" width="20%" value="employment" title="Employment" />
                <DataTableColumn name="head" value="head" title="Head" width="10ch" />
                <DataTableColumn
                    fixed="right"
                    name="date"
                    title={<InteractiveTooltip title="Date of creation" tooltipText="Date of creation" />}
                    width="10ch"
                >
                    {new Date().toLocaleDateString()}
                </DataTableColumn>
                <DataTableColumn
                    sortable={false}
                    fixed="right"
                    name="actions"
                    title="Actions"
                    width="10ch"
                    renderCell={RowControls}
                />
            </DataTable>
        </div>
    );
};
