import React, { AnchorHTMLAttributes, FC, HTMLAttributes } from 'react';
import cn from 'classnames';

import { TaskanyLogo } from '../TaskanyLogo/TaskanyLogo';
import { Link } from '../Link/Link';

import s from './Header.module.css';

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    logo?: React.ReactNode;
    nav?: React.ReactNode;
    children?: React.ReactNode;
    menu?: React.ReactNode;
}

export const HeaderLogo: FC<HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => (
    <span className={cn(s.HeaderLogo, className)} {...props}>
        {children}
    </span>
);

export const HeaderNav: FC<HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => {
    return (
        <nav className={cn(s.HeaderNav, className)} {...props}>
            {children}
        </nav>
    );
};

export const HeaderContent: FC<HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => {
    return (
        <div className={cn(s.HeaderContent, className)} {...props}>
            {children}
        </div>
    );
};

export const HeaderMenu: FC<HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => {
    return (
        <div className={cn(s.HeaderMenu, className)} {...props}>
            {children}
        </div>
    );
};

export const HeaderNavLink: FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ className, children, ...props }) => {
    return (
        <Link className={cn(s.HeaderNavLink, className)} {...props}>
            {children}
        </Link>
    );
};

const DefaultLogo: React.FC = () => (
    <HeaderLogo>
        <Link href="/">
            <TaskanyLogo />
        </Link>
    </HeaderLogo>
);

export const Header: React.FC<HeaderProps> = ({ menu, logo = <DefaultLogo />, nav, children, className, ...attrs }) => (
    <header className={cn(s.HeaderContainer, className)} {...attrs}>
        {logo}
        {nav}
        {children}
        {menu}
    </header>
);
