import React, { FC, HTMLAttributes } from 'react';
import cn from 'classnames';

import s from './Kanban.module.css';

export const KanbanColumn: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...rest }) => {
    return (
        <div className={cn(s.KanbanColumn, className)} {...rest}>
            {children}
        </div>
    );
};
