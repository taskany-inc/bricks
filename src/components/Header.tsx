import React from 'react';
import styled from 'styled-components';
import { textColor, gray7, colorPrimary, gray3 } from '@taskany/colors';

import { Link } from './Link';
import { TaskanyLogo } from './TaskanyLogo';

const HeaderContainer = styled.header`
    display: grid;
    grid-template-columns: 20px 1fr minmax(150px, auto) 55px;
    align-items: center;
    padding: 20px 40px;

    background-color: ${gray3};
`;

const HeaderLogo = styled.span`
    justify-self: center;

    transition: transform 200ms ease-in-out;

    &:hover {
        transform: scale(1.08);
    }
`;

const HeaderNav = styled.nav`
    padding-left: 40px;
`;

const HeaderContent = styled.div`
    display: flex;
    align-items: center;
`;

const HeaderMenu = styled.div`
    justify-self: end;
`;

export const HeaderNavLink = styled.a<{ disabled?: boolean }>`
    display: inline-block;
    padding-bottom: 2px;
    margin-top: 3px;

    font-size: 18px;
    font-weight: 600;
    color: ${textColor};
    text-decoration: none;

    border-bottom: 1px solid transparent;

    transition: color, border-color 250ms ease-in-out;

    &:hover {
        color: ${textColor};
        border-color: ${colorPrimary};
    }

    ${({ disabled }) =>
        disabled &&
        `
            color: ${gray7};
        `}

    & + & {
        margin-left: 24px;
    }
`;

const DefaultLogo: React.FC = () => (
    <Link href="/" inline>
        <TaskanyLogo />
    </Link>
);

export const Header: React.FC<{
    logo?: React.ReactNode;
    nav?: React.ReactNode;
    children?: React.ReactNode;
    menu?: React.ReactNode;
}> = ({ menu, logo = <DefaultLogo />, nav, children }) => (
    <HeaderContainer>
        <HeaderLogo>{logo}</HeaderLogo>
        <HeaderNav>{nav}</HeaderNav>
        <HeaderContent>{children}</HeaderContent>
        <HeaderMenu>{menu}</HeaderMenu>
    </HeaderContainer>
);

export default Header;
