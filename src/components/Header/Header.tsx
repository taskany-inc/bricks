import React from 'react';
import styled from 'styled-components';
import { textColor, gray7, colorPrimary, gray3 } from '@taskany/colors';

import { Link } from '../Link/Link';
import { TaskanyLogo } from '../TaskanyLogo';

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    logo?: React.ReactNode;
    nav?: React.ReactNode;
    children?: React.ReactNode;
    menu?: React.ReactNode;
}

const HeaderContainer = styled.header`
    display: grid;
    grid-template-columns: 20px 1fr minmax(150px, auto) 55px;
    align-items: center;
    padding: 20px 40px;

    background-color: ${gray3};
`;

export const HeaderLogo = styled.span`
    justify-self: center;

    transition: transform 200ms ease-in-out;

    &:hover {
        transform: scale(1.08);
    }
`;

export const HeaderNav = styled.nav`
    padding-left: 40px;
`;

export const HeaderContent = styled.div`
    display: flex;
    align-items: center;
`;

export const HeaderMenu = styled.div`
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
    <HeaderLogo>
        <Link href="/" inline>
            <TaskanyLogo />
        </Link>
    </HeaderLogo>
);

export const Header: React.FC<HeaderProps> = ({ menu, logo = <DefaultLogo />, nav, children, ...attrs }) => (
    <HeaderContainer {...attrs}>
        {logo}
        {nav}
        {children}
        {menu}
    </HeaderContainer>
);
