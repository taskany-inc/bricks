import React from 'react';
import styled from 'styled-components';
import { gray6 } from '@taskany/colors';

export interface StateDotProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    color?: string;
    hoverColor?: string;
    size?: 's' | 'm';
    className?: string;
    onClick?: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledStateDot = styled(({ size, ...props }: Pick<StateDotProps, 'size' | 'onClick'>) => <div {...props} />)`
    width: 14px;
    height: 14px;
    border-radius: 100%;

    transition: background-color 300ms ease-in-out;

    & + & {
        margin-left: 6px;
    }

    background-color: var(--bkg);

    ${({ onClick }) =>
        onClick &&
        `
            cursor: pointer;
        `}

    ${({ size }) =>
        size === 's' &&
        `
            width: 10px;
            height: 10px;
        `}
`;

export const StateDot: React.FC<StateDotProps> = React.memo(({ size = 'm', color, hoverColor, ...props }) => {
    const style = {
        '--bkg': color ?? gray6,
        '--bkgHover': hoverColor ?? color ?? gray6,
    } as React.CSSProperties;

    return <StyledStateDot size={size} style={style} {...props} />;
});
