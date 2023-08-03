import { gray4, gray6 } from '@taskany/colors';
import styled, { css } from 'styled-components';

const maxCols = 12;

interface GapProps {
    /** Offset between child elements */
    gap?: number;
}

interface AlignProps {
    /** As `align-items` for flexible row container */
    align: 'start' | 'center' | 'end' | 'baseline';
}

interface JustifyProps {
    /** As `justify-content` for flexible container */
    justify: 'start' | 'center' | 'end' | 'between' | 'around' | 'baseline';
}

export type TableCellProps = Partial<JustifyProps & AlignProps> &
    (
        | {
              /** Size of column width in range from `1` to `12` */
              col: number;
              min?: never;
              width?: never;
          }
        | {
              col?: never;
              /** Minimum size column, use instead of `col` prop */
              min: true;
              width?: never;
          }
        | {
              col?: never;
              min?: never;
              /** Absolute or relative width, ex. `10ch` or `100` */
              width: number | string;
          }
        | {
              col?: never;
              min?: never;
              width?: never;
          }
    );

export interface TableProps extends GapProps {
    /** Container width */
    width?: number;
}

export type TableRowProps = GapProps &
    Partial<AlignProps & JustifyProps> & {
        /** Apply interactive styles: hover */
        interactive?: boolean;
        /** Prop that mark current row as focused, ex. for keyboard navigation */
        focused?: boolean;
    };

const mapRuleSet: { [key in AlignProps['align'] | JustifyProps['justify']]: string } = {
    baseline: 'baseline',
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
    around: 'space-around',
    between: 'space-between',
};

export const Table = styled.div<TableProps>`
    display: flex;
    flex-direction: column;

    ${({ width }) =>
        width &&
        css`
            width: ${width}px;
        `}

    ${({ gap }) =>
        gap &&
        css`
            gap: ${gap}px;
        `}
`;

export const TableRow = styled.div<TableRowProps>`
    display: flex;
    flex-basis: 100%;
    align-items: flex-start;
    justify-content: flex-start;

    ${({ align }) =>
        align &&
        css`
            align-items: ${mapRuleSet[align]};
        `}

    ${({ justify }) =>
        justify &&
        css`
            justify-content: ${mapRuleSet[justify]};
        `}

    ${({ gap }) =>
        gap &&
        css`
            gap: ${gap}px;
        `}

    ${({ interactive }) =>
        interactive &&
        css`
            &:hover {
                background-color: ${gray6};
            }
        `}

    ${({ focused, interactive }) =>
        interactive &&
        focused &&
        css`
            background-color: ${gray4};
        `}
`;

export const TableCell = styled.div<TableCellProps>`
    display: inline-flex;
    align-items: baseline;
    flex-wrap: wrap;

    ${({ col }) => {
        if (!col) {
            return css`
                flex: 1 0 0%;
                max-width: 100%;
            `;
        }

        if (col > maxCols) {
            return css`
                flex: 0 0 100%;
                max-width: 100%;
            `;
        }

        const width = (col / maxCols) * 100;

        return css`
            flex: 0 0 ${width}%;
            max-width: {width}%;
        `;
    }}

    ${({ width }) => {
        if (width == null) {
            return;
        }
        const unit = typeof width === 'number' ? 'px' : '';

        return css`
            flex: 0 0 ${width}${unit};
            max-width: ${width}${unit};
        `;
    }}

    ${({ min }) =>
        min &&
        css`
            flex-basis: 0%;
            max-width: max-content;
        `}

    ${({ justify }) =>
        justify &&
        css`
            justify-content: ${mapRuleSet[justify]};
        `}

    ${({ align }) =>
        align &&
        css`
            align-self: ${mapRuleSet[align]};
        `}
`;
