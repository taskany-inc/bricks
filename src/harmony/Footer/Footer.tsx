import React, { FC, HTMLAttributes } from 'react';
import cn from 'classnames';

import { Text } from '../Text/Text';

import s from './Footer.module.css';

export const Footer: FC<HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => (
    <footer className={cn(s.Footer, className)} {...props}>
        {children}
    </footer>
);

export const FooterCopyright: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
    <Text className={className} {...props}>{`© ${new Date().getFullYear()} Taskany, Inc.`}</Text>
);

export const FooterMenu: FC<HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => (
    <div className={cn(s.FooterMenu, className)} {...props}>
        {children}
    </div>
);

export const FooterItem: FC<HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => (
    <div className={cn(s.FooterItem, className)} {...props}>
        {children}
    </div>
);
