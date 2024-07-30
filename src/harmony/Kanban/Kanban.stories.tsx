import React, { FC, ReactNode } from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { IconMessageTextOutline } from '@taskany/icons';

import { Badge } from '../Badge/Badge';
import { State } from '../State/State';
import { Text } from '../Text/Text';
import { Dropdown as DropdownProvider, DropdownTrigger } from '../Dropdown/Dropdown';
import { FlatProgressBar } from '../FlatProgressBar/FlatProgressBar';

import { KanbanContainer } from './KanbanContainer';
import { KanbanColumn } from './KanbanColumn';
import { KanbanCard } from './KanbanCard';
import { KanbanCardTitle } from './KanbanCardTitle';
import { KanbanCardInfo } from './KanbanCardInfo';
import { KanbanCardContent } from './KanbanCardContent';
import { KanbanCardContentItem } from './KanbanCardContentItem';

const meta: Meta<typeof KanbanContainer> = {
    title: '@harmony/Kanban',
    component: KanbanContainer,
};

export default meta;

const Dropdown = ({ children, label }: { children: ReactNode; label: string }) => {
    return (
        <DropdownProvider isOpen={false} arrow>
            <DropdownTrigger view="outline" label={label} readOnly>
                {children}
            </DropdownTrigger>
        </DropdownProvider>
    );
};

const Card: FC<{
    counter: number;
    title: string;
    subInfo?: string;
    progress: number;
}> = ({ counter, title, subInfo, progress }) => {
    return (
        <KanbanCard>
            <KanbanCardTitle>{title}</KanbanCardTitle>
            <KanbanCardInfo>
                <Badge size="s" weight="regular" text={counter} iconLeft={<IconMessageTextOutline size="s" />} />
                <Text size="s">{subInfo}</Text>
            </KanbanCardInfo>
            <KanbanCardContent>
                <KanbanCardContentItem>
                    <Dropdown label="Owner">
                        <Text size="s">Minulin Timur</Text>
                    </Dropdown>
                </KanbanCardContentItem>
            </KanbanCardContent>
            <KanbanCardContent>
                <KanbanCardContentItem>
                    <Dropdown label="Estimate">
                        <Text size="s">Q4/2023</Text>
                    </Dropdown>
                </KanbanCardContentItem>
                <KanbanCardContentItem>
                    <Dropdown label="Priority">
                        <Text size="s">Low</Text>
                    </Dropdown>
                </KanbanCardContentItem>
            </KanbanCardContent>
            <FlatProgressBar value={progress} />
        </KanbanCard>
    );
};

const columns = [
    {
        state: {
            color: 'var(--status-in-progress)',
            title: 'In Progress',
        },
        data: [
            {
                title: '[news] Автоматизиция тестирования',
                subInfo: 'updated 4 weeks ago',
                counter: 6,
                progress: 33,
            },
            {
                title: 'Повысить экономию трайбов за счет роста автоматизации',
                subInfo: 'updated 6 days ago',
                counter: 12,
                progress: 60,
            },
        ],
    },

    {
        state: {
            color: 'var(--status-finished)',
            title: 'Finished',
        },
        data: [
            {
                title: 'Принять окончательное решение по ключевым проектам',
                subInfo: 'updated 1 day ago',
                counter: 14,
                progress: 100,
            },
        ],
    },

    {
        state: {
            color: 'var(--status-failed)',
            title: 'Failed',
        },
        data: [
            {
                title: 'Повысить экономию трайбов за счет роста автоматизации',
                subInfo: 'updated last month',
                counter: 10,
                progress: 13,
            },
            {
                title: 'Принять окончательное решение по ключевым проектам',
                subInfo: 'updated 4 hours ago',
                counter: 12,
                progress: 63,
            },
            {
                title: '[news] Автоматизиция тестирования',
                subInfo: 'updated just now',
                counter: 9,
                progress: 80,
            },
        ],
    },
];

export const Default: StoryFn<typeof KanbanContainer> = () => {
    return (
        <KanbanContainer>
            {columns.map((column, i) => (
                <KanbanColumn key={i}>
                    <div style={{ marginBottom: 'var(--gap-s)' }}>
                        <State {...column.state} />
                    </div>
                    {column.data.map((item, j) => (
                        <Card key={j} {...item} />
                    ))}
                </KanbanColumn>
            ))}
        </KanbanContainer>
    );
};
