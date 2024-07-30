import React, { FC, HTMLAttributes } from 'react';
import cn from 'classnames';

import s from './Kanban.module.css';

export const KanbanCard: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...rest }) => {
    return (
        <div className={cn(s.KanbanCard, className)} {...rest}>
            {children}
        </div>
    );
};
