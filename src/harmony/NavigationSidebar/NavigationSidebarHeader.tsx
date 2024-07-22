import React, { FC, HTMLAttributes } from 'react';
import cn from 'classnames';

import s from './NavigationSidebar.module.css';

export const NavigationSidebarHeader: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...rest }) => (
    <div className={cn(s.NavigationSidebarHeader, className)} {...rest}>
        {children}
    </div>
);
