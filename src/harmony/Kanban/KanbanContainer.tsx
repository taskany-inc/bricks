import React, { FC, HTMLAttributes } from 'react';
import cn from 'classnames';

import s from './Kanban.module.css';

export const KanbanContainer: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...rest }) => {
    return (
        <div className={cn(s.KanbanContainer, className)} {...rest}>
            {children}
        </div>
    );
};
