import React, { FC, HTMLAttributes } from 'react';
import cn from 'classnames';

import s from './NavigationSidebar.module.css';

export const Navigation: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...rest }) => (
    <div className={cn(s.Navigation, className)} {...rest}>
        {children}
    </div>
);
