import React, { useMemo, HTMLAttributes, forwardRef } from 'react';
import cn from 'classnames';

import s from './Table.module.css';

interface TableProps extends HTMLAttributes<HTMLDivElement> {}

export const Table = forwardRef<HTMLDivElement, TableProps>(({ className, children, ...attrs }, ref) => {
    return (
        <div className={cn(s.Table, className)} {...attrs} ref={ref}>
            {children}
        </div>
    );
});

interface TableRowProps extends HTMLAttributes<HTMLDivElement> {}

export const TableRow = forwardRef<HTMLDivElement, TableRowProps>(({ className, children, ...attrs }, ref) => {
    return (
        <div className={cn(s.Row, className)} {...attrs} ref={ref}>
            {children}
        </div>
    );
});

interface TableCellProps extends HTMLAttributes<HTMLDivElement> {
    width?: number | string;
}

export const TableCell = forwardRef<HTMLDivElement, TableCellProps>(
    ({ className, children, width, style, ...attrs }, ref) => {
        const styles = useMemo(() => {
            const map: Record<string, string> = {};

            if (width) {
                map['--table-cell-width'] = typeof width === 'string' ? width : `${width}px`;
            }

            return { ...style, ...map };
        }, [style, width]);

        return (
            <div style={styles} className={cn(s.Cell, className)} {...attrs} ref={ref}>
                {children}
            </div>
        );
    },
);
