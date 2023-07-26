import React, { useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { gray5, gray3 } from '@taskany/colors';
import styled from 'styled-components';

import { Table, TableRow, TableCell } from '../components/Table';
import { GoalIcon } from '../components/Icon/GoalIcon';
import { Text } from '../components/Text';
import { UserPic } from '../components/UserPic';
import { Dot } from '../components/Dot';
import { Tag } from '../components/Tag';
import { CircleProgressBar } from '../components/CircleProgressBar';
import { Button } from '../components/Button';

const meta: Meta<typeof Table> = {
    title: 'Table',
    component: Table,
};

export default meta;
type Story = StoryFn<typeof meta>;

const data = Array.from({ length: 10 }, (_, i) => ({
    title: `Title ${i + 1}`,
    projectId: (Math.random() * 10).toString(16).slice(2, 8).padEnd(6, 'AB').toUpperCase(),
    tags: Array.from({ length: Math.ceil(Math.random() * 5) }, (_, i) => `Tag ${i + 1}`),
    progress: Math.round(Math.random() * 100),
    children: Array.from({ length: 3 }, (_, i) => ({
        title: `Title ${i + 1}`,
        projectId: (Math.random() * 10).toString(16).slice(2, 8).padEnd(6, 'AB').toUpperCase(),
        tags: Array.from({ length: Math.ceil(Math.random() * 5) }, (_, i) => `Tag ${i + 1}`),
        progress: Math.round(Math.random() * 100),
        children: Array.from({ length: 3 }, (_, i) => ({
            title: `Title ${i + 1}`,
            projectId: (Math.random() * 10).toString(16).slice(2, 8).padEnd(6, 'AB').toUpperCase(),
            tags: Array.from({ length: Math.ceil(Math.random() * 5) }, (_, i) => `Tag ${i + 1}`),
            progress: Math.round(Math.random() * 100),
            children: undefined,
        })),
    })),
}));

const StyledTableRow = styled(TableRow)<{ depth?: number }>`
    padding: 5px 0;
    border-bottom: 1px solid ${gray5};
    border-top: 1px solid ${gray3};

    &:first-child {
        border-top: 0;
    }

    &:last-child {
        border-bottom: 0;
    }

    & > ${TableCell}:first-child {
        padding-left: calc(1rem * ${({ depth = 0 }) => depth});
        box-sizing: border-box;
    }
`;

export const Default: Story = () => {
    return (
        <Table width={600}>
            {data.map(({ title, projectId, tags, progress }) => (
                <StyledTableRow key={title} align="center" gap={10}>
                    <TableCell min>
                        <GoalIcon size="xxs" noWrap />
                    </TableCell>
                    <TableCell col={5}>
                        <Text size="s" weight="bold">
                            <Dot size="m" view="primary" />
                            {title}
                        </Text>
                    </TableCell>
                    <TableCell min>
                        <CircleProgressBar value={progress} size="s" />
                    </TableCell>
                    <TableCell width="6ch">
                        <Text size="s" weight="thin">
                            {projectId}
                        </Text>
                    </TableCell>
                    <TableCell justify="end">
                        {tags.map((t) => (
                            <Tag size="s" title={t} />
                        ))}
                    </TableCell>
                    <TableCell min justify="center">
                        <UserPic size={14} email="admin@taskany.org" />
                    </TableCell>
                </StyledTableRow>
            ))}
        </Table>
    );
};

const CollapseRow = ({ rowData, childData, depth = 0 }) => {
    const [showChilds, setShowChilds] = useState(false);
    return (
        <>
            <StyledTableRow depth={depth}>
                <TableCell col={5}>
                    <Text size="s" weight="bold">
                        <Dot size="m" view="primary" />
                        {rowData.title}
                    </Text>
                </TableCell>
                <TableCell min>
                    <CircleProgressBar value={rowData.progress} size="s" />
                </TableCell>
                {childData?.length ? (
                    <TableCell justify="center">
                        <Button
                            size="s"
                            ghost
                            text={showChilds ? 'hide' : 'show'}
                            onClick={() => setShowChilds((prev) => !prev)}
                        />
                    </TableCell>
                ) : null}
            </StyledTableRow>
            {showChilds &&
                childData?.map(({ title, progress, children }) => (
                    <CollapseRow rowData={{ title, progress }} childData={children} key={title} depth={depth + 1} />
                ))}
        </>
    );
};

export const RecursiveTable = () => {
    return (
        <Table width={600}>
            {data.slice(0, 3).map(({ title, progress, children }) => (
                <CollapseRow rowData={{ title, progress }} childData={children} key={title} />
            ))}
        </Table>
    );
};
