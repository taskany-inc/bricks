import React from 'react';
import styled from 'styled-components';
import { gray4, gray6, radiusM, textColor } from '@taskany/colors';

import { UserPic } from './UserPic';

interface UserMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
    name?: string;
    email?: string;
    image?: string;
    focused?: boolean;
    checked?: boolean;
    className?: string;

    onClick?: () => void;
}

const StyledUserCard = styled.div<Pick<UserMenuItemProps, 'focused' | 'checked'>>`
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 2fr 10fr;
    justify-content: center;
    align-items: center;
    min-width: 250px;

    padding: 6px;
    margin-bottom: 4px;

    border-radius: ${radiusM};

    cursor: pointer;

    &:last-child {
        margin-bottom: 0;
    }

    &:hover {
        background-color: ${gray4};
    }

    ${({ focused }) =>
        focused &&
        `
            background-color: ${gray6};
        `}

    ${({ checked }) =>
        checked &&
        `
            background-color: ${gray4};
        `}
`;

const StyledUserInfo = styled.div`
    padding-left: 4px;

    overflow: hidden;
    text-overflow: ellipsis;
`;

const StyledUserName = styled.div`
    font-size: 14px;
    font-weight: 600;
`;

const StyledUserEmail = styled.div`
    font-size: 12px;
    color: ${textColor};
`;

const StyledUserPic = styled(UserPic)`
    justify-self: center;
`;

export const UserMenuItem: React.FC<UserMenuItemProps> = ({ name, email, image, ...props }) => (
    <StyledUserCard {...props}>
        <StyledUserPic src={image} email={email} size={24} />

        <StyledUserInfo>
            <StyledUserName>{name}</StyledUserName>
            <StyledUserEmail>{email}</StyledUserEmail>
        </StyledUserInfo>
    </StyledUserCard>
);
