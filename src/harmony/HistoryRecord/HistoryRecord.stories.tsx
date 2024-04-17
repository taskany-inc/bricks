import React from 'react';
import { Meta } from '@storybook/react';

import { Link } from '../Link/Link';
import { Text } from '../Text/Text';

import { HistoryRecord, HistoryRecordCollapse } from './HistoryRecord';

const meta: Meta<typeof HistoryRecord> = {
    title: '@harmony/HistoryRecord',
    component: HistoryRecord,
};

export default meta;

const makeUsers = (...names: string[]) =>
    names.map((name) => ({
        name,
        email: `${name.toLowerCase().replace(/\s*/, '')}@taskany.org`,
        src: 'https://secure.gravatar.com/avatar/51d3c935ea5453b2915e6180a9944c11/?default=https%3A%2F%2Fvanillicon.com%2F8fff907b6502f8011495fb154ec1c0a2_200.png&rating=g&size=560',
    }));

export const Default = () => {
    const [first, second] = makeUsers('John Doe', 'Maria Doe');
    return (
        <div style={{ width: '350px' }}>
            <HistoryRecord authors={[first]} title={first.name} date="4 months ago">
                <Text size="xs" weight="thin">
                    has changed title from{' '}
                    <Text as="span" strike>
                        Title One
                    </Text>{' '}
                    to <Text as="b">Title Two</Text>
                </Text>
            </HistoryRecord>

            <HistoryRecord authors={[second]} title={second.name} date="4 month ago">
                <Text as="p" size="xs" weight="thin">
                    has changed project from{' '}
                    <Link href="https://taskany.org">
                        <Text as="span" strike weight="bold">
                            Project One
                        </Text>{' '}
                    </Link>
                    to{' '}
                    <Link href="https://taskany.org">
                        <Text as="span" weight="bold">
                            Project Two
                        </Text>{' '}
                    </Link>
                </Text>
            </HistoryRecord>
        </div>
    );
};

export const Collaspable = () => {
    const users = makeUsers('John Doe', 'Maria Doe', 'Denis Voropaev');
    const [first, second] = users;

    return (
        <div style={{ width: 500 }}>
            <HistoryRecord authors={users} title={users.map(({ name }) => name).join(' and ')} date="5 months ago">
                <Text as="p" size="xs" weight="thin">
                    has changed project about 5 times
                </Text>
            </HistoryRecord>
            <HistoryRecordCollapse translates={['Collapse', 'Show activity']}>
                {users.map((user) => (
                    <HistoryRecord authors={[user]} title={user.name} date="4 month ago">
                        <Text as="p" size="xs" weight="thin">
                            has changed project from{' '}
                            <Link href="https://taskany.org">
                                <Text as="span" strike weight="bold">
                                    Project One
                                </Text>{' '}
                            </Link>
                            to{' '}
                            <Link href="https://taskany.org">
                                <Text as="span" weight="bold">
                                    Project Two
                                </Text>{' '}
                            </Link>
                        </Text>
                    </HistoryRecord>
                ))}
            </HistoryRecordCollapse>
            <HistoryRecord authors={users} title={users.map(({ name }) => name).join('and')} date="5 months ago">
                <Text as="p" size="xs" weight="thin">
                    has changed project about 5 times
                </Text>
            </HistoryRecord>
            <HistoryRecordCollapse translates={['Collapse', 'Show activity']}>
                {users.map((user) => (
                    <HistoryRecord authors={[user]} title={user.name} date="4 month ago">
                        <Text as="p" size="xs" weight="thin">
                            has changed project from{' '}
                            <Link href="https://taskany.org">
                                <Text as="span" strike weight="bold">
                                    Project One
                                </Text>{' '}
                            </Link>
                            to{' '}
                            <Link href="https://taskany.org">
                                <Text as="span" weight="bold">
                                    Project Two
                                </Text>{' '}
                            </Link>
                        </Text>
                    </HistoryRecord>
                ))}
            </HistoryRecordCollapse>
            <HistoryRecord authors={[first]} title={first.name} date="4 months ago">
                <Text size="xs" weight="thin">
                    has changed title from{' '}
                    <Text as="span" strike>
                        Title One
                    </Text>{' '}
                    to <Text as="b">Title Two</Text>
                </Text>
            </HistoryRecord>

            <HistoryRecord authors={[second]} title={second.name} date="4 month ago">
                <Text as="p" size="xs" weight="thin">
                    has changed project from{' '}
                    <Link href="https://taskany.org">
                        <Text as="span" strike weight="bold">
                            Project One
                        </Text>{' '}
                    </Link>
                    to{' '}
                    <Link href="https://taskany.org">
                        <Text as="span" weight="bold">
                            Project Two
                        </Text>{' '}
                    </Link>
                </Text>
            </HistoryRecord>
        </div>
    );
};
