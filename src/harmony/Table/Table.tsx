import React, { useMemo, HTMLAttributes, FC } from 'react';
import cn from 'classnames';

import s from './Table.module.css';

interface TableProps extends HTMLAttributes<HTMLDivElement> {}

export const Table: FC<TableProps> = ({ className, children, ...attrs }) => {
    return (
        <div className={cn(s.Table, className)} {...attrs}>
            {children}
        </div>
    );
};

interface TableRowProps extends HTMLAttributes<HTMLDivElement> {}

export const TableRow: FC<TableRowProps> = ({ className, children, ...attrs }) => {
    return (
        <div className={cn(s.Row, className)} {...attrs}>
            {children}
        </div>
    );
};

interface TableCellProps extends HTMLAttributes<HTMLDivElement> {
    width?: number | string;
}

export const TableCell: FC<TableCellProps> = ({ className, children, width, style, ...attrs }) => {
    const styles = useMemo(() => {
        const map: Record<string, string> = {};

        if (width) {
            map['--table-cell-width'] = typeof width === 'string' ? width : `${width}px`;
        }

        return { ...style, ...map };
    }, [style, width]);

    return (
        <div style={styles} className={cn(s.Cell, className)} {...attrs}>
            {children}
        </div>
    );
};
