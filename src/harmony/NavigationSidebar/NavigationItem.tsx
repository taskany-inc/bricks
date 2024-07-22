import React, { FC, HTMLAttributes } from 'react';
import cn from 'classnames';

import { ListViewItem } from '../ListView/ListView';
import { Link } from '../Link/Link';
import { MenuItem } from '../MenuItem/MenuItem';

import s from './NavigationSidebar.module.css';

interface NavigationItemProps extends HTMLAttributes<HTMLDivElement> {
    href: string;
    selected?: boolean;
}

export const NavigationItem: FC<NavigationItemProps> = ({ selected, href, children, ...rest }) => (
    <ListViewItem
        value={href}
        renderItem={({ hovered, active, ...props }) => (
            <Link view="primary" className={s.NavigationItemLink}>
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
            </Link>
        )}
    />
);
