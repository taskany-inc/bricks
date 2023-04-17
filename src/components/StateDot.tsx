import React from 'react';
import styled from 'styled-components';
import { gray6 } from '@taskany/colors';

export interface StateDotProps {
    title?: string;
    color?: string;
    hoverColor?: string;
    size?: 's' | 'm';
    className?: string;
    onClick?: () => void;
}

const StyledStateDot = styled.div<{
    size: StateDotProps['size'];
    onClick: StateDotProps['onClick'];
}>`
    width: 14px;
    height: 14px;
    border-radius: 100%;

    transition: background-color 300ms ease-in-out;

    & + & {
        margin-left: 6px;
    }

    background-color: var(--bkg);

    /* &:hover {
        background-color: var(--bkg-hover);
    } */

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

export const StateDot: React.FC<StateDotProps> = React.memo(
    ({ title, size = 'm', color, hoverColor, onClick, className }) => {
        const style = {
            '--bkg': color ?? gray6,
            '--bkgHover': hoverColor ?? color ?? gray6,
        } as React.CSSProperties;

        return <StyledStateDot className={className} title={title} size={size} onClick={onClick} style={style} />;
    },
);
