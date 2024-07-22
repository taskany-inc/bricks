import React, { FC, HTMLAttributes } from 'react';
import cn from 'classnames';

import s from './NavigationSidebar.module.css';

export const NavigationSidebar: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...rest }) => {
    return (
        <div className={cn(s.NavigationSidebarContainer, className)} {...rest}>
            {children}
        </div>
    );
};
