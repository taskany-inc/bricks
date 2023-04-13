import React from 'react';
import styled from 'styled-components';
import { textColor, gray7, colorPrimary, gray3 } from '@taskany/colors';

import { nullable } from '../utils/nullable';

import { SearchIcon } from './Icon';
import { Link } from './Link';
import { TaskanyLogo } from './TaskanyLogo';

const HeaderContainer = styled.header`
    display: grid;
    grid-template-columns: 20px 10fr 150px 55px;
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

const HeaderSearch = styled.div`
    position: relative;
    display: inline-block;
    margin-left: 30px;
    top: 3px;
`;

const HeaderCreateButton = styled.div`
    display: flex;
    align-items: center;
`;

const HeaderMenu = styled.div`
    justify-self: end;
`;

export type HeaderNavItemProps = {
    title: string;
    href: string;
    disabled?: boolean;
};

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

const DefaultHeaderNavLink: React.FC<HeaderNavItemProps> = ({ href, title }) => (
    <HeaderNavLink href={href} title={title}>
        {title}
    </HeaderNavLink>
);
const DefaultLogo: React.FC = () => (
    <Link href="/" inline>
        <TaskanyLogo />
    </Link>
);

export const Header: React.FC<{
    logo?: React.ReactNode;
    links?: HeaderNavItemProps[];
    linkComponent?: React.FC<HeaderNavItemProps>;
    actionButton?: React.ReactNode;
    menu?: React.ReactNode;
    onSearch?: (query: string) => void;
}> = ({
    menu,
    logo = <DefaultLogo />,
    links = [],
    linkComponent: LinkComponent = DefaultHeaderNavLink,
    onSearch,
    actionButton,
}) => (
    <HeaderContainer>
        <HeaderLogo>{logo}</HeaderLogo>

        <HeaderNav>
            {links.map((link, i) => (
                <LinkComponent key={i} {...link} />
            ))}

            {nullable(onSearch, () => (
                <HeaderSearch>
                    <SearchIcon size="s" color={gray7} />
                </HeaderSearch>
            ))}
        </HeaderNav>

        <HeaderCreateButton>{actionButton}</HeaderCreateButton>
        <HeaderMenu>{menu}</HeaderMenu>
    </HeaderContainer>
);

export default Header;
