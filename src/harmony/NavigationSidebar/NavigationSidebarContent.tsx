import React, { FC, HTMLAttributes } from 'react';
import cn from 'classnames';

import s from './NavigationSidebar.module.css';

export const NavigationSidebarContent: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...rest }) => (
    <div className={cn(s.NavigationSidebarContent, className)} {...rest}>
        {children}
    </div>
);
