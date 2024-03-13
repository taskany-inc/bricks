import React, { HTMLAttributes, ReactNode, useMemo } from 'react';
import cn from 'classnames';
import { IconTickOutline } from '@taskany/icons';

import { Dot } from '../Dot/Dot';

import s from './MenuItem.module.css';

interface MenuItemProps extends HTMLAttributes<HTMLDivElement> {
    selectable?: boolean;
    iconLeft?: ReactNode;
    hovered?: boolean;
    selected?: boolean;
    multiple?: boolean;
}

export const MenuItem = ({
    iconLeft,
    className,
    hovered,
    selected,
    children,
    selectable,
    multiple,
    ...props
}: MenuItemProps) => {
    const icon = useMemo(() => {
        if (!selectable || iconLeft) {
            return iconLeft;
        }

        if (multiple && selected) {
            return <IconTickOutline size="s" />;
        }

        if (multiple) {
            return <span className={s.MenuItemIconContainer} />;
        }

        return <Dot className={cn({ [s.MenuItemSelectedDot]: selected })} />;
    }, [selectable, iconLeft, multiple, selected]);

    return (
        <div className={cn(s.MenuItem, { [s.MenuItem_hovered]: hovered }, className)} {...props}>
            {icon}

            {children}
        </div>
    );
};
