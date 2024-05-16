import React, { FC, HTMLAttributes } from 'react';
import cn from 'classnames';

import s from './Card.module.css';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    backgroundColor?: string;
    foregroundColor?: string;
}

export const Card: FC<CardProps> = ({ className, children, backgroundColor, foregroundColor, ...props }) => {
    const style = {
        '--card-background': backgroundColor,
        '--card-foreground': foregroundColor,
    } as React.CSSProperties;

    return (
        <div className={cn(s.Card, className)} style={style} {...props}>
            {children}
        </div>
    );
};

interface CardInfoProps extends HTMLAttributes<HTMLDivElement> {
    corner?: boolean;
}

export const CardInfo: FC<CardInfoProps> = ({ className, children, corner, ...props }) => {
    return (
        <div className={cn(s.CardInfo, { [s.CardInfo_corner]: corner }, className)} {...props}>
            {children}
        </div>
    );
};

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
    view?: 'flat' | 'transparent';
}

export const CardContent: FC<CardContentProps> = ({ className, children, view = 'flat', ...props }) => {
    return (
        <div className={cn(s.CardContent, { [s.CardContent_flat]: view === 'flat' }, className)} {...props}>
            {children}
        </div>
    );
};
