import React, { useMemo, useRef } from 'react';

import { nullable } from '../../utils';
import { User } from '../User/User';
import { Tooltip } from '../Tooltip/Tooltip';

import classes from './UserGroup.module.css';

type UserProps = Pick<React.ComponentProps<typeof User>, 'email' | 'name' | 'src'>;

interface UserGroupProps {
    users: Array<UserProps>;
    showCount?: number;
}

const WrappedUser: React.FC<UserProps> = (props) => {
    const targetRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <User short className={classes.UserGroupItem} {...props} ref={targetRef} />
            <Tooltip placement="top" reference={targetRef}>
                {props.name ?? props.email}
            </Tooltip>
        </>
    );
};

export const UserGroup: React.FC<UserGroupProps> = ({ users, showCount = 4 }) => {
    const realShowCount = users.length > showCount ? showCount : users.length;
    const targetRestRef = useRef<HTMLDivElement>(null);

    const restUserNames = useMemo(() => {
        const restUsers = users.slice(realShowCount, users.length);

        if (restUsers.length) {
            return restUsers.map(({ name, email }) => name ?? email).join(', ');
        }

        return null;
    }, [users]);

    return (
        <div className={classes.UserGroup}>
            {users.slice(0, realShowCount).map((user, i) => (
                <WrappedUser key={`${user.email}-${i}`} {...user} />
            ))}
            {nullable(restUserNames, (list) => (
                <>
                    <span ref={targetRestRef}>...</span>
                    <Tooltip reference={targetRestRef} placement="top">
                        {list}
                    </Tooltip>
                </>
            ))}
        </div>
    );
};
