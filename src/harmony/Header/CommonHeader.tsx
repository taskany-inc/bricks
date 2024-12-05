import React, { AnchorHTMLAttributes, FC, HTMLAttributes } from 'react';
import cn from 'classnames';

import { Link } from '../../components/Link/Link';
import { TaskanyLogo } from '../../components/TaskanyLogo';

import s from './Header.module.css';

interface CommonHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    logo?: React.ReactNode;
    nav?: React.ReactNode;
    children?: React.ReactNode;
    menu?: React.ReactNode;
}

export const CommonHeaderLogo: FC<HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => (
    <span className={cn(s.HeaderLogo, className)} {...props}>
        {children}
    </span>
);

export const CommonHeaderNav: FC<HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => {
    return (
        <nav className={cn(s.HeaderNav, className)} {...props}>
            {children}
        </nav>
    );
};

export const CommonHeaderContent: FC<HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => {
    return (
        <div className={cn(s.HeaderContent, className)} {...props}>
            {children}
        </div>
    );
};

export const CommonHeaderMenu: FC<HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => {
    return (
        <div className={cn(s.HeaderMenu, className)} {...props}>
            {children}
        </div>
    );
};

export const CommonHeaderNavLink: FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ className, children, ...props }) => {
    return (
        <a className={cn(s.HeaderNavLink, className)} {...props}>
            {children}
        </a>
    );
};

const DefaultLogo: React.FC = () => (
    <CommonHeaderLogo>
        <Link href="/" inline>
            <TaskanyLogo />
        </Link>
    </CommonHeaderLogo>
);

export const CommonHeader: React.FC<CommonHeaderProps> = ({
    menu,
    logo = <DefaultLogo />,
    nav,
    children,
    className,
    ...attrs
}) => (
    <header className={cn(s.HeaderContainer, className)} {...attrs}>
        {logo}
        {nav}
        {children}
        {menu}
    </header>
);
