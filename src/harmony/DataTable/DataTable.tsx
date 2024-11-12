import React, { useCallback, forwardRef, useRef, useId, useEffect, useState, useMemo } from 'react';
import cn from 'classnames';
import { IconSortDownOutline, IconSortUpOutline } from '@taskany/icons';

import { Table, TableCell, TableRow } from '../Table/Table';
import { Text } from '../Text/Text';
import { Tooltip } from '../Tooltip/Tooltip';
import { nullable } from '../../utils';
import { useForkedRef } from '../../hooks';

import styles from './DataTable.module.css';

type TableProps = React.ComponentProps<typeof Table>;
type TableCellProps = React.ComponentProps<typeof TableCell>;

interface TableColumDefault<T>
    extends Partial<
        Pick<React.ComponentProps<typeof Text>, 'lines' | 'size' | 'weight' | 'wordBreak' | 'wordWrap' | 'ellipsis'>
    > {
    value: keyof T;
    children?: never;
    renderCell?: never;
}
interface TableColumsWithChildren {
    children: React.ReactNode;
    value?: never;
    renderCell?: never;
}
interface TableColumnRenderProps<T> {
    renderCell: (item: T) => React.ReactNode;
    children?: never;
    value?: never;
}

type TableColumn<T> = Pick<TableCellProps, 'width'> & {
    name: string;
    title: React.ReactNode;
    fixed?: boolean | 'left' | 'right';
    sortable?: boolean;
} & (TableColumDefault<T> | TableColumnRenderProps<T> | TableColumsWithChildren);

interface SortProps<T> {
    key: keyof T;
    dir: 'asc' | 'desc' | undefined;
}

interface OverflowScrollState {
    left: boolean;
    right: boolean;
}

type DataTableRowImpl<T, C> = C extends React.ComponentType<infer P>
    ? React.ComponentType<React.PropsWithChildren<P & { item: T }> & React.RefAttributes<HTMLDivElement>>
    : never;

interface DataTableProps<T, C extends React.ComponentType, P extends React.ComponentProps<C> = React.ComponentProps<C>>
    extends TableProps {
    rowComponent?: DataTableRowImpl<T, C>;
    rowProps?: P;
    data: T[];
    keyGetter?: (item: T) => string;
    sorting: SortProps<T>[];
    onSort?: (value: SortProps<T>) => void;
}

const SortingIcon: React.FC<{ dir?: 'asc' | 'desc'; className?: string }> = ({ dir, className }) => {
    switch (dir) {
        case 'desc':
            return <IconSortUpOutline size="s" className={className} />;
        default:
            return <IconSortDownOutline size="s" className={className} />;
    }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Column<T>(_: TableColumn<T>): React.ReactNode {
    return null;
}

const findColumnNodes = (from: HTMLElement, count?: number): HTMLElement[] => {
    if (count == null) {
        return [];
    }
    let childs = from.children;
    while (childs.length < count) {
        childs = childs[0].children;
    }

    return Array.from(childs) as HTMLElement[];
};

const findFirstParentWithNonZeroWidth = (from: HTMLElement): HTMLElement => {
    let parent = from.parentNode;

    while (parent instanceof HTMLElement && parent.offsetWidth === 0) {
        parent = parent.parentNode;
    }

    return parent as HTMLElement;
};

const DataTableRow: React.FC<{
    canHovered?: boolean;
    columnProps?: Array<React.ComponentProps<typeof Column>> | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rowComponent: DataTableRowImpl<unknown, any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rowProps: React.ComponentProps<any>;
    renderCell: React.FC<{
        col: React.ComponentProps<typeof Column>;
        applyInnerShadow?: 'left' | 'right';
        index: number;
    }>;
    itemData?: unknown;
}> = ({ columnProps, renderCell, rowProps, rowComponent: Row = TableRow, canHovered, itemData }) => {
    const innerRef = useRef<HTMLDivElement>(null);
    const shadowNodeRef = useRef<HTMLSpanElement>(null);
    const childNodeWidthsRef = useRef<number[]>([]);

    useEffect(() => {
        if (innerRef.current != null) {
            const nodes = findColumnNodes(innerRef.current, columnProps?.length);
            // 'cause for hover rows adding one extra node in the end of children
            const nodeLen = canHovered ? nodes.length - 1 : nodes.length;

            for (let i = 0; i < nodeLen; i += 1) {
                const curr = nodes[i];
                const { width = 0 } = curr.getBoundingClientRect();
                childNodeWidthsRef.current[i] = width;
            }
        }
    }, [canHovered]);

    useEffect(() => {
        if (innerRef.current && childNodeWidthsRef.current.length > 0) {
            const offsets: { l: number[]; r: number[] } = {
                l: [0],
                r: [0],
            };

            for (let i = 0; i < childNodeWidthsRef.current.length; i += 1) {
                const curr = childNodeWidthsRef.current[i];
                offsets.l.push(curr + (offsets.l.at(-1) ?? 0));
            }

            for (let i = childNodeWidthsRef.current.length - 1; i >= 0; i -= 1) {
                const curr = childNodeWidthsRef.current[i];
                offsets.r.push(curr + (offsets.r.at(-1) ?? 0));
            }

            if (columnProps != null) {
                const nodes = findColumnNodes(innerRef.current, columnProps?.length);
                columnProps.forEach((col, index) => {
                    if (col.fixed) {
                        const el = nodes[index];

                        if (el instanceof HTMLElement) {
                            let val = offsets.l.at(index) || 0;
                            let prop = 'left';

                            if (col.fixed === 'right') {
                                val = offsets.r.at(-(index + 2)) || 0;
                                prop = 'right';
                            }

                            el.style.setProperty(prop, `${val}px`);
                        }
                    }
                });
            }
        }
    }, [columnProps, canHovered]);

    const applyShadowDimension = useCallback(
        (dimensions?: { left: number; width: number; height: number }, hovered?: boolean) => {
            const shadowNode = shadowNodeRef.current;

            if (shadowNode == null) {
                return;
            }

            if (!hovered || dimensions == null) {
                shadowNode?.removeAttribute('style');
                return;
            }

            shadowNode.style.cssText = `left: ${dimensions.left}px; width: ${dimensions.width}px; height: ${dimensions.height}px`;
        },
        [],
    );

    useEffect(() => {
        const node = innerRef.current;
        let hovered = false;

        if (node == null) {
            return;
        }

        const parent = findFirstParentWithNonZeroWidth(node);

        if (parent == null) {
            return;
        }

        const handleScroll = () => {
            if (!hovered) {
                return;
            }

            applyShadowDimension(
                {
                    left: parent.scrollLeft,
                    width: parent.offsetWidth,
                    height: node.clientHeight,
                },
                hovered,
            );
        };

        if (!canHovered) {
            return;
        }

        const onMouseEnter = () => {
            hovered = true;
            handleScroll();
            parent.addEventListener('scroll', handleScroll);
        };

        const onMouseLeave = () => {
            hovered = false;
            applyShadowDimension(undefined, hovered);
            parent.removeEventListener('scroll', handleScroll);
        };

        node.addEventListener('mouseenter', onMouseEnter);
        node.addEventListener('mouseleave', onMouseLeave);

        return () => {
            node.removeEventListener('mouseenter', onMouseEnter);
            node.removeEventListener('mouseleave', onMouseLeave);
        };
    }, [applyShadowDimension]);

    return (
        <Row {...rowProps} item={itemData} className={cn(styles.DataTableRow, rowProps?.className)} ref={innerRef}>
            {columnProps?.map((col, index) => {
                let applyInnerShadow: 'left' | 'right' | undefined;
                if (col.fixed) {
                    if (col.fixed === 'right') {
                        applyInnerShadow = columnProps[index - 1].fixed == null ? 'right' : undefined;
                    } else {
                        applyInnerShadow = columnProps[index + 1].fixed == null ? 'left' : undefined;
                    }
                }
                return renderCell({ col, applyInnerShadow, index });
            })}

            {nullable(canHovered, () => (
                <span className={styles.DataTableRow_hovered} ref={shadowNodeRef} />
            ))}
        </Row>
    );
};

const isTableColumnsDefaultProps = (
    props: TableColumn<unknown>,
): props is Exclude<TableColumn<unknown>, TableColumnRenderProps<unknown> | TableColumsWithChildren> => {
    return props.renderCell == null && props.children == null;
};

const pickTextNodeProps = (colProps: React.ComponentProps<typeof Column>) => {
    if (isTableColumnsDefaultProps(colProps)) {
        const { lines, wordBreak, wordWrap, ellipsis, size, weight } = colProps;
        const textProps = { lines, wordBreak, wordWrap, ellipsis, size, weight };

        for (const [key, value] of Object.entries(textProps) as [keyof typeof textProps, unknown][]) {
            if (value == null) {
                delete textProps[key];
            }
        }

        return textProps;
    }

    return null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DataTableItemValue = forwardRef<HTMLSpanElement, React.ComponentProps<typeof Column> & { data: any }>(
    (props, ref) => {
        const { name, value, renderCell, children, data } = props;

        if (typeof renderCell === 'function') {
            return renderCell(data);
        }

        if (children != null) {
            return children;
        }

        const textNodeProps = pickTextNodeProps(props);

        return (
            <Text as="span" lines={2} ellipsis wordWrap="normal" wordBreak="break-word" {...textNodeProps} ref={ref}>
                {data[value ?? name]}
            </Text>
        );
    },
);

const useShouldTooltip = () => {
    const textNodeRef = useRef<HTMLSpanElement>(null);
    const [shouldRenderTooltip, setShouldRenderTooltip] = useState<boolean>();

    if (textNodeRef.current != null && shouldRenderTooltip == null) {
        const renderNode = textNodeRef.current;
        setShouldRenderTooltip(renderNode.offsetHeight < renderNode.scrollHeight);
    }

    return useMemo(
        () => ({
            shouldRenderTooltip,
            ref: textNodeRef,
        }),
        [shouldRenderTooltip],
    );
};

const DataTableItem: React.FC<{
    col: React.ComponentProps<typeof Column>;
    applyInnerShadow?: 'left' | 'right';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    shades: Record<'left' | 'right', boolean>;
}> = ({ col, data, applyInnerShadow, shades }) => {
    const { ref, shouldRenderTooltip } = useShouldTooltip();

    const { width, fixed } = col;

    return (
        <TableCell
            width={width}
            className={cn(styles.DataTableCell, {
                [styles.DataTableFixedColumn]: !!fixed,
                [styles.DataTableFixedColumn_left]: fixed === 'left' || fixed === true,
                [styles.DataTableFixedColumn_right]: fixed === 'right',
                [styles.DataTableCell_ShowShadow]:
                    (shades.left && applyInnerShadow === 'left') || (shades.right && applyInnerShadow === 'right'),
            })}
        >
            <DataTableItemValue {...col} data={data} ref={ref} />
            {nullable(shouldRenderTooltip, () => (
                <Tooltip reference={ref} placement="top">
                    {data[col.value ?? col.name]}
                </Tooltip>
            ))}
        </TableCell>
    );
};

interface DataTableHeaderCellValueProps {
    sortable: boolean;
    title: React.ReactNode;
    sortingDir: SortProps<unknown>['dir'];
    onClick?: () => void;
}

const DataTableHeaderCellValue: React.FC<DataTableHeaderCellValueProps> = ({
    sortable,
    title,
    sortingDir,
    onClick,
}) => {
    return (
        <span
            className={cn(styles.DataTableHeaderBadge, {
                [styles.DataDataTableHeaderBadgeShownSort]: sortingDir != null,
            })}
            onClick={onClick}
        >
            <Text lines={1} size="s" weight="regular" ellipsis className={styles.DataTableHeaderBadgeText}>
                {title}
            </Text>
            {nullable(sortable, () => (
                <SortingIcon className={styles.DataTableHeaderBadgeIcon} dir={sortingDir} />
            ))}
        </span>
    );
};

const sortDirMap = {
    asc: 'desc',
    desc: undefined,
    default: 'asc',
} as const;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DataTable = forwardRef<HTMLDivElement, DataTableProps<any, any, any>>(
    (
        { data, children, rowProps, rowComponent: Row = TableRow, keyGetter, sorting, onSort, className, ...props },
        ref,
    ) => {
        /**
         * this `React.Children` api call allows avoid re-renders after mount children components
         * because reading children props components goes at same time with mount Table component
         * also such a dicision allows use declarative jsx-like definition for each table column
         * instead of object notation in props
         */
        const columnProps = React.Children.map<React.ComponentProps<typeof Column>, ReturnType<typeof Column>>(
            children,
            (child) => {
                if (React.isValidElement(child) && child.type === Column) {
                    return child.props;
                }

                return null;
            },
        );

        const tableId = useId();
        const tableRootRef = useRef<HTMLDivElement>(null);
        const nodeRef = useForkedRef(tableRootRef, ref);
        const [shades, setShades] = React.useState<OverflowScrollState>({
            left: false,
            right: (columnProps || [])?.some(({ fixed }) => fixed === 'right'),
        });

        const onScrollHandler = useCallback(() => {
            if (tableRootRef?.current == null) {
                return;
            }

            const node = tableRootRef.current;

            setShades((prev) => {
                const currentState = {
                    left: node.scrollLeft > 0,
                    right: Math.ceil(node.scrollLeft) + node.offsetWidth < node.scrollWidth,
                };
                const nextState = { ...prev };
                if (currentState.left !== nextState.left) {
                    nextState.left = currentState.left;
                }

                if (currentState.right !== nextState.right) {
                    nextState.right = currentState.right;
                }

                return nextState;
            });
        }, []);

        useEffect(() => onScrollHandler(), [onScrollHandler]);

        return (
            <Table {...props} className={cn(styles.DataTable, className)} ref={nodeRef} onScroll={onScrollHandler}>
                <DataTableRow
                    key={`Table.${tableId}.header`}
                    columnProps={columnProps}
                    rowComponent={TableRow}
                    rowProps={{ ...rowProps, className: cn(styles.DataTableHeader, styles.DataTableRow) }}
                    renderCell={({ col, applyInnerShadow }) => {
                        const { title, width, fixed, name, sortable = true } = col;
                        const sortParam = sortable ? sorting.find(({ key }) => key === name) : undefined;
                        const nextDir: SortProps<unknown>['dir'] = sortParam?.dir
                            ? sortDirMap[sortParam.dir]
                            : sortDirMap.default;

                        return (
                            <TableCell
                                key={`TableHeaderCell.${name}`}
                                className={cn(styles.DataTableCell, styles.DataTableHeaderCell, {
                                    [styles.DataTableHeaderSpacer]: !title,
                                    [styles.DataTableFixedColumn]: !!fixed,
                                    [styles.DataTableFixedColumn_left]: fixed === 'left' || fixed === true,
                                    [styles.DataTableFixedColumn_right]: fixed === 'right',
                                    [styles.DataTableCell_ShowShadow]:
                                        (shades.left && applyInnerShadow === 'left') ||
                                        (shades.right && applyInnerShadow === 'right'),
                                })}
                                width={width}
                            >
                                {nullable(title, (t) => (
                                    <DataTableHeaderCellValue
                                        title={t}
                                        onClick={sortable ? () => onSort?.({ key: name, dir: nextDir }) : undefined}
                                        sortable={sortable}
                                        sortingDir={sortParam?.dir}
                                    />
                                ))}
                            </TableCell>
                        );
                    }}
                />
                {data.map((item, index) => (
                    <DataTableRow
                        key={keyGetter?.(item) ?? `TableRow.${tableId}.${index}`}
                        canHovered
                        columnProps={columnProps}
                        rowProps={rowProps}
                        rowComponent={Row}
                        itemData={item}
                        renderCell={(props) => (
                            <DataTableItem
                                key={`TableCell.${tableId}.${index}.${props.index}`}
                                data={item}
                                shades={shades}
                                {...props}
                            />
                        )}
                    />
                ))}
            </Table>
        );
    },
);

export function getTableComponents<T, C extends React.ComponentType = React.ComponentType>(): {
    DataTable: React.ForwardRefExoticComponent<
        DataTableProps<T extends Array<unknown> ? T[number] : T, C> & React.RefAttributes<HTMLDivElement>
    >;
    DataTableColumn: React.ComponentType<TableColumn<T extends Array<unknown> ? T[number] : T>>;
} {
    return {
        DataTable: forwardRef((props, ref) => <DataTable {...props} ref={ref} />),
        DataTableColumn: Column,
    };
}
