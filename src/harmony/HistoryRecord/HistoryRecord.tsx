import React, { useEffect, useMemo, useReducer, useRef } from 'react';
import classNames from 'classnames';

import { User } from '../User/User';
import { Counter } from '../Counter/Counter';
import { Text } from '../Text/Text';
import { nullable } from '../../utils';
import { Dot } from '../Dot/Dot';
import { Button } from '../Button/Button';

import classes from './HistoryRecord.module.css';

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
            className={classNames(classes.HistoryRecordAuthorsGroup, {
                [classes.HistoryRecordAuthorsGroupExpandeble]: authors.length > 1,
            })}
            style={visibleCountVar}
        >
            {authors.slice(0, 2).map((author) => (
                <User {...author} key={author.email} short size="m" className={classes.HistoryRecordUsersGroupItem} />
            ))}
            {nullable(authors.length - 2 > 0, () => (
                <Counter count={authors.length - 2} />
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
        <div className={classNames(classes.HistoryRecord)}>
            <UserCollapse authors={authors} />
            <div className={classes.HistoryRecordContent}>
                <div className={classes.HistoryRecordTitleWrapper}>
                    <Text size="s" weight="bold">
                        {title}
                    </Text>
                    <Text as="span" size="xs" weight="thin" className={classes.HistoryRecordTime}>
                        {date}
                    </Text>
                </div>
                <div className={classes.HistoryRecordContent}>{children}</div>
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
    const heightRef = useRef(0);

    useEffect(() => {
        if (collapseRef.current) {
            heightRef.current = collapseRef.current.offsetHeight;
        }
    }, []);

    useEffect(() => {
        if (collapseRef.current) {
            collapseRef.current.style.setProperty('height', collapsed ? '0' : `${heightRef.current}px`);
        }
    }, [collapsed]);

    return (
        <>
            <div className={classes.HistoryRecordCollapse}>
                <div className={classes.HistoryRecordCollapsePanel} ref={collapseRef}>
                    {children}
                </div>
            </div>
            <div className={classNames(classes.HistoryRecord)}>
                <Dot className={classes.HistoryRecordDot} />
                <Button size="s" view="default" onClick={toggleCollapsed} text={translates[Number(collapsed)]} />
            </div>
        </>
    );
};
