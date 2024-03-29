import React, { FC, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { gapSm, gray4, gray9, gray6, radiusL, radiusXl } from '@taskany/colors';

import { Nullish } from '../../types/void';
import { UserPic } from '../UserPic';
import { Text } from '../Text/Text';
import { Popup } from '../Popup/Popup';

interface UserGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    users: Nullish<{ name: string; email: string; image: string }>[];
    className?: string;
    size?: number;
    limit?: number;
}

const hoverCss = css`
    z-index: 1;
    filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.08));
`;

const UserGroupContainer = styled.div`
    display: inline-flex;
`;

const UserContainer = styled.div<{ size: number }>`
    border-radius: 100%;
    border: 1px solid ${gray4};
    height: ${({ size }) => `${size}px`};

    & + & {
        margin-left: calc(${gapSm} * -1);
    }

    &:hover {
        ${hoverCss};
    }
`;

const StyledCounter = styled.div`
    min-width: 0.75rem;
    padding: 0px 5px;
    margin: 2px 0px;
    border-radius: ${radiusL};
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${gray4};
    position: relative;
    right: 10px;

    &:hover {
        ${hoverCss};
    }
`;

const StyledSmallCircle = styled.div`
    width: 0.7rem;
    height: 0.7rem;
    border-radius: ${radiusXl};
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${gray6};
    position: relative;
    right: 15px;
    transform: translateY(8px);
`;

export const UserGroup: FC<UserGroupProps> = ({ users, size = 24, limit = 3, ...props }) => {
    const showCounter = users.length > limit;
    const items = users.slice(0, showCounter ? limit : users.length);

    const counterUsersList = useMemo(() => {
        return users
            .slice(limit)
            .map((user) => user.name)
            .join(', ');
    }, [limit, users]);

    return (
        <UserGroupContainer {...props}>
            {items.map((user, i) => (
                <Popup
                    key={i}
                    target={
                        <UserContainer size={size}>
                            <UserPic name={user.name} src={user.image} email={user.email} size={size} />
                        </UserContainer>
                    }
                    tooltip
                    offset={[0, 8]}
                    placement="top"
                >
                    {user.name}
                </Popup>
            ))}
            {showCounter && (
                <>
                    <Popup
                        target={
                            <StyledCounter>
                                <Text color={gray9} size="xs">
                                    {users.length - limit}
                                </Text>
                            </StyledCounter>
                        }
                        tooltip
                        offset={[0, 8]}
                        maxWidth={420}
                        placement="top"
                    >
                        {counterUsersList}
                    </Popup>
                    <StyledSmallCircle>
                        <Text color={gray9} size="xxs" as="span">
                            +
                        </Text>
                    </StyledSmallCircle>
                </>
            )}
        </UserGroupContainer>
    );
};
