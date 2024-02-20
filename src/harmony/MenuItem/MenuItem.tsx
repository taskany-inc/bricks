import React, { ComponentProps, HTMLAttributes, ReactNode } from 'react';
import cn from 'classnames';
import { BaseIcon, IconTickOutline } from '@taskany/icons';

import { nullable } from '../../utils';

import s from './MenuItem.module.css';

interface MenuItemProps extends HTMLAttributes<HTMLDivElement> {
    selectable?: boolean;
    iconLeft?: ReactNode;
    hovered?: boolean;
    selected?: boolean;
    size?: ComponentProps<typeof IconTickOutline>['size'];
}

export const MenuItem = ({
    iconLeft,
    className,
    hovered,
    selected,
    children,
    size = 's',
    selectable,
    ...props
}: MenuItemProps) => {
    return (
        <div className={cn(s.MenuItem, { [s.MenuItem_hovered]: hovered }, className)} {...props}>
            {nullable(
                selectable && !iconLeft,
                () =>
                    nullable(
                        selected,
                        () => <IconTickOutline size={size} />,
                        <BaseIcon value={() => null} size={size} />,
                    ),
                iconLeft,
            )}

            {children}
        </div>
    );
};
