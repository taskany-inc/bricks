import React from 'react';
import styled from 'styled-components';
import { gray7, gray9, radiusL } from '@taskany/colors';

interface BadgeProps {
    size?: 's' | 'm';
    children: React.ReactNode;
    className?: string;
}

const StyledBadge = styled.div<{ size: BadgeProps['size'] }>`
    box-sizing: border-box;

    background-color: ${gray7};

    border-radius: ${radiusL};

    color: ${gray9};
    font-size: 12px;

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
`;

export const Badge: React.FC<BadgeProps> = ({ size = 's', children, className }) => (
    <StyledBadge className={className} size={size}>
        {children}
    </StyledBadge>
);

export default Badge;
