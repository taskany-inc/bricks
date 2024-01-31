import React, { ComponentProps, HTMLAttributes, MouseEvent, useCallback } from 'react';
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

interface TagProps extends HTMLAttributes<HTMLDivElement> {}

export const Tag = ({ className, children, ...props }: TagProps) => {
    return (
        <div className={cn(s.Tag, { [s.Tag_hovered]: Boolean(props.onClick) }, className)} {...props}>
            {children}
        </div>
    );
};
