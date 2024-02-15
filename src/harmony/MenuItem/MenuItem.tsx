import React, { ComponentProps, HTMLAttributes, ReactNode } from 'react';
import cn from 'classnames';
import { BaseIcon, IconTickOutline } from '@taskany/icons';

import { nullable } from '../../utils';

import s from './MenuItem.module.css';

interface MenuItemProps extends HTMLAttributes<HTMLDivElement> {
    iconLeft?: ReactNode;
    hovered?: boolean;
    selected?: boolean;
    size?: ComponentProps<typeof IconTickOutline>['size'];
}

export const MenuItem = ({ iconLeft, className, hovered, selected, children, size = 's', ...props }: MenuItemProps) => {
    return (
        <div className={cn(s.MenuItem, { [s.MenuItem_hovered]: hovered }, className)} {...props}>
            {nullable(
                selected || iconLeft,
                () => iconLeft || <IconTickOutline size={size} />,
                <BaseIcon value={() => null} size={size} />,
            )}
            {children}
        </div>
    );
};
