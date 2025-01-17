import React, { ComponentProps, HTMLAttributes, MouseEvent, ReactNode, useCallback } from 'react';
import cn from 'classnames';
import { IconXSmallOutline } from '@taskany/icons';

import { Button } from '../Button/Button';

import s from './Tag.module.css';

interface TagCleanButtonProps extends HTMLAttributes<HTMLButtonElement>, ComponentProps<typeof Button> {}

export const TagCleanButton = ({
    size = 'xs',
    className,
    onClick: onButtonClick,
    ...props
}: Omit<TagCleanButtonProps, 'children'>) => {
    const onClick = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            onButtonClick?.(e);
        },
        [onButtonClick],
    );

    return (
        <Button
            size={size}
            onClick={onClick}
            className={cn(s.Button, className)}
            iconLeft={<IconXSmallOutline size={size} />}
            {...props}
        />
    );
};

type View = 'default' | 'rounded';
type Color = 'primary' | 'secondary';
type Size = 's' | 'm';

const colorMap: Record<Color, string | null> = {
    primary: s.Tag_primary,
    secondary: null,
};

const sizeMap: Record<Size, string> = {
    s: s.Tag_s,
    m: s.Tag_m,
};

interface TagProps extends HTMLAttributes<HTMLDivElement> {
    action?: ReactNode;
    view?: View;
    color?: Color;
    size?: Size;
}

export const Tag = ({
    className,
    children,
    action,
    view = 'default',
    color = 'secondary',
    size = 's',
    ...props
}: TagProps) => {
    return (
        <div
            className={cn(
                s.Tag,
                { [s.Tag_hovered]: !!props.onClick, [s.Tag_interactive]: !action, [s.Tag_rounded]: view === 'rounded' },
                colorMap[color],
                sizeMap[size],
                className,
            )}
            {...props}
        >
            {children}
            {action}
        </div>
    );
};
