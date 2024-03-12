import React, { useMemo, useRef } from 'react';

import { nullable } from '../../utils';
import { User } from '../User/User';
import { Tooltip } from '../Tooltip/Tooltip';
import { Group, GroupItem } from '../Group/Group';

interface UserProps extends Pick<React.ComponentProps<typeof User>, 'email' | 'name'> {
    image?: string | null;
}

interface UserGroupProps {
    users: Array<UserProps>;
    showCount?: number;
}

const WrappedUser: React.FC<UserProps> = ({ name, email, image, ...props }) => {
    const targetRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <User short name={name} email={email} src={image} {...props} ref={targetRef} />
            <Tooltip placement="top" reference={targetRef}>
                {name ?? email}
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
        <Group interactive overlay="s">
            {users.slice(0, realShowCount).map((user, i) => (
                <GroupItem key={`${user.email}-${i}`}>
                    <WrappedUser {...user} />
                </GroupItem>
            ))}
            {nullable(restUserNames, (list) => (
                <>
                    <span ref={targetRestRef}>...</span>
                    <Tooltip reference={targetRestRef} placement="top">
                        {list}
                    </Tooltip>
                </>
            ))}
        </Group>
    );
};
