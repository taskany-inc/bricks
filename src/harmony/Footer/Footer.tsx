import React, { FC, HTMLAttributes } from 'react';
import cn from 'classnames';

import { Text } from '../Text/Text';

import s from './Footer.module.css';

export const Footer: FC<HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => (
    <footer className={cn(s.Footer, className)} {...props}>
        {children}
    </footer>
);

interface FooterCopyrightProps extends HTMLAttributes<HTMLDivElement> {
    orgName?: string;
}

export const FooterCopyright: FC<FooterCopyrightProps> = ({ className, orgName, ...props }) => (
    <Text className={className} wordBreak="keep-all" {...props}>{`© ${new Date().getFullYear()} ${orgName}`}</Text>
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
