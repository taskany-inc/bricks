import React, { FC, HTMLAttributes } from 'react';
import cn from 'classnames';

import s from './Kanban.module.css';

export const KanbanScroller: FC<{ shadow?: number } & HTMLAttributes<HTMLDivElement>> = ({
    children,
    shadow = 0,
    className,
    ...rest
}) => {
    const style = { '--kanban-shadow-height': `${shadow}px` } as React.CSSProperties;

    return (
        <div className={s.KanbanShadow} style={style}>
            <div className={cn(s.KanbanScroller, className)} {...rest}>
                {children}
            </div>
        </div>
    );
};
