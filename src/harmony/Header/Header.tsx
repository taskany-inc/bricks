import React from 'react';

import s from './Header.module.css';

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    logo?: React.ReactNode;
    search?: React.ReactNode;
    children?: React.ReactNode;
    menu?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ menu, logo, search, children, ...attrs }) => (
    <div className={s.HeaderContent} {...attrs}>
        {logo}
        {search}
        {children}
        {menu}
    </div>
);
