import React, { ComponentPropsWithoutRef, useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';

import {
    CollapsableItem,
    CollapsableContentItem,
    Text,
    Table,
    TableRow,
    TableCell,
    GoalIcon,
    UserPic,
    Dot,
    Tag,
    CircleProgressBar,
} from '../components';

const meta: Meta<typeof CollapsableItem> = {
    title: 'CollapsableItem',
    component: CollapsableItem,
};

export default meta;
type Story = StoryFn<typeof meta>;

type ItemProps = Omit<ComponentPropsWithoutRef<typeof CollapsableItem>, 'onClick' | 'isOpen'>;

const Item = ({ header, ...restProps }: ItemProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setTimeout(
            () => {
                setIsOpen((prev) => !prev);
            },
            Math.random() > 0.5 ? 300 : 0,
        );
    };

    return (
        <CollapsableItem
            isOpen={isOpen}
            header={<Text style={{ padding: 10 }}>{header}</Text>}
            onClick={restProps.children ? () => handleOpen() : undefined}
            {...restProps}
        />
    );
};

const data = Array.from({ length: 4 }, (_, i) => ({
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

export const Default: Story = () => {
    return (
        <Item header="Level A" hasNestedCollapsableItems isRoot>
            <Item header="Level A-A" hasNestedCollapsableItems>
                <Item header="Level A-A-A" hasNestedCollapsableItems>
                    <Item header="Level A-A-A-A" />
                    <Item header="Level A-A-A-B" hasNestedCollapsableItems>
                        <Item header="Level A-A-A-B-A">
                            <CollapsableContentItem>Hi</CollapsableContentItem>
                            <CollapsableContentItem>Every</CollapsableContentItem>
                            <CollapsableContentItem>One</CollapsableContentItem>
                        </Item>
                    </Item>
                    <Item header="Level A-A-A-C" />
                </Item>
                <Item header="Level A-A-B" />
                <Item header="Level A-A-C" />
                <Item header="Level A-A-D" hasNestedCollapsableItems>
                    <Item header="Level A-A-D-A" hasNestedCollapsableItems>
                        <Item header="Level A-A-D-A-A">
                            <Table width={600}>
                                {data.map(({ title, projectId, tags, progress }) => (
                                    <TableRow key={title} align="center" gap={10}>
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
                                    </TableRow>
                                ))}
                            </Table>
                        </Item>
                    </Item>
                </Item>
            </Item>
            <Item header="Level A-B" hasNestedCollapsableItems>
                <Item header="Level A-B-A" />
                <Item header="Level A-B-B" hasNestedCollapsableItems>
                    <Item header="Level A-B-B-A" />
                </Item>
            </Item>
        </Item>
    );
};
