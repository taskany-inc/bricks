import React, { FC, HTMLAttributes } from 'react';
import cn from 'classnames';

import s from './Card.module.css';

export const Card: FC<HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => {
    return (
        <div className={cn(s.Card, className)} {...props}>
            {children}
        </div>
    );
};

interface CardInfoProps extends HTMLAttributes<HTMLDivElement> {
    backgroundColor?: string;
    foregroundColor?: string;
    corner?: boolean;
}

export const CardInfo: FC<CardInfoProps> = ({
    className,
    children,
    foregroundColor,
    backgroundColor,
    corner,
    ...props
}) => {
    const style = {
        '--card-background': backgroundColor,
        '--card-foreground': foregroundColor,
    } as React.CSSProperties;

    return (
        <div className={cn(s.CardInfo, { [s.CardInfo_corner]: corner }, className)} style={style} {...props}>
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
