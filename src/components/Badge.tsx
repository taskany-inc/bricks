import React from 'react';
import styled from 'styled-components';
import { gray7, gray9, radiusL } from '@taskany/colors';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    size?: 's' | 'm';
    color?: string;
    className?: string;

    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const StyledBadge = styled.div<{ size: BadgeProps['size']; color?: BadgeProps['color'] }>`
    box-sizing: border-box;

    background-color: ${({ color }) => (color ? `${color}25` : gray7)};

    border-radius: ${radiusL};
    border: ${({ color }) => `solid 1px ${color}`};

    color: ${({ color }) => color || gray9};
    font-size: 12px;
    cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};

    ${({ size }) =>
        size &&
        {
            s: `
            padding: 1px 4px;
        `,
            m: `
            padding: 2px 8px;
        `,
        }[size]}

    &:hover {
        background-color: ${({ color }) => (color ? `${color}45` : gray7)};
    }
`;

export const Badge: React.FC<BadgeProps> = ({ size = 's', children, ...props }) => (
    <StyledBadge size={size} {...props}>
        {children}
    </StyledBadge>
);
