import React, { FC, HTMLAttributes } from 'react';
import cn from 'classnames';

import { ListViewItem } from '../ListView/ListView';
import { MenuItem } from '../MenuItem/MenuItem';

import s from './NavigationSidebar.module.css';

interface NavigationItemProps extends HTMLAttributes<HTMLDivElement> {
    value: string;
    selected?: boolean;
}

export const NavigationItem: FC<NavigationItemProps> = ({ selected, value, children, ...rest }) => (
    <ListViewItem
        value={value}
        renderItem={({ hovered, active, ...props }) => (
            <MenuItem
                hovered={active || hovered}
                className={cn({
                    [s.MenuItem_active]: selected,
                })}
                {...props}
                {...rest}
            >
                {children}
            </MenuItem>
        )}
    />
);
