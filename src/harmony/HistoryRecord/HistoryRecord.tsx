import React, { useMemo, useReducer, useRef } from 'react';
import cn from 'classnames';

import { User } from '../User/User';
import { Counter } from '../Counter/Counter';
import { Text } from '../Text/Text';
import { nullable } from '../../utils';
import { Dot } from '../Dot/Dot';
import { Button } from '../Button/Button';

import s from './HistoryRecord.module.css';

type UserProps = React.ComponentProps<typeof User>;

interface HistoryRecordProps {
    date: React.ReactNode;
    authors: Array<UserProps>;
    title: string;
}

const UserCollapse: React.FC<Pick<HistoryRecordProps, 'authors'>> = ({ authors }) => {
    const visibleCountVar = useMemo(() => {
        return {
            '--users-count': Math.min(authors.length, 3),
        } as React.CSSProperties;
    }, [authors]);

    return (
        <div
            className={cn(s.HistoryRecordAuthorsGroup, {
                [s.HistoryRecordAuthorsGroupExpandable]: authors.length > 1,
            })}
            style={visibleCountVar}
        >
            {authors.slice(0, 2).map((author) => (
                <User {...author} key={author.email} short size="m" className={s.HistoryRecordUsersGroupItem} />
            ))}
            {nullable(authors.length - 2 > 0, () => (
                <Counter
                    count={authors.length - 2}
                    className={cn(s.HistoryRecordUsersGroupItem, s.HistoryRecordUsersRestCounter)}
                />
            ))}
        </div>
    );
};

export const HistoryRecord: React.FC<React.PropsWithChildren<HistoryRecordProps>> = ({
    authors,
    title,
    children,
    date,
}) => {
    return (
        <div className={cn(s.HistoryRecord)}>
            <UserCollapse authors={authors} />
            <div className={s.HistoryRecordContent}>
                <div className={s.HistoryRecordTitleWrapper}>
                    <Text size="s" weight="bold">
                        {title}
                    </Text>
                    <Text as="span" size="xs" weight="thin" className={s.HistoryRecordTime}>
                        {date}
                    </Text>
                </div>
                <div className={s.HistoryRecordContent}>{children}</div>
            </div>
        </div>
    );
};

interface HistoryRecordCollapseProps {
    /** [toCloseText, toOpenText] */
    translates: [string, string];
}

export const HistoryRecordCollapse: React.FC<React.PropsWithChildren<HistoryRecordCollapseProps>> = ({
    children,
    translates,
}) => {
    const collapseRef = useRef<HTMLDivElement | null>(null);
    const [collapsed, toggleCollapsed] = useReducer((state) => !state, true);

    const height = useMemo(() => {
        return collapsed ? '0px' : collapseRef.current?.scrollHeight;
    }, [collapsed]);

    return (
        <>
            <div className={s.HistoryRecordCollapse} style={{ height }}>
                <div className={s.HistoryRecordCollapsePanel} ref={collapseRef}>
                    {children}
                </div>
            </div>
            <div className={cn(s.HistoryRecord)}>
                <Dot className={s.HistoryRecordDot} />
                <Button size="s" view="default" onClick={toggleCollapsed} text={translates[Number(collapsed)]} />
            </div>
        </>
    );
};
