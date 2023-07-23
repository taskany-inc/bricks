import React from 'react';
import styled from 'styled-components';
import { gapS, gray4, gray7, gray8, radiusM } from '@taskany/colors';

import { nullable } from '../utils/nullable';

import { Dot } from './Dot';

export interface MenuItemProps {
    selected?: boolean;
    focused?: boolean;
    disabled?: boolean;
    color?: string;
    ghost?: boolean;
    children?: React.ReactNode;
    view?: React.ComponentProps<typeof Dot>['view'];
    icon?: React.ReactNode;
    className?: string;

    onClick?: () => void;
}

const StyledMenuItem = styled.div<{ focused?: boolean; color?: string; ghost?: boolean; disabled?: boolean }>`
    box-sizing: border-box;
    justify-content: center;
    align-items: center;

    padding: 6px;
    margin-bottom: 4px;

    color: ${({ color }) => color || 'inherit'};

    border: 1px solid ${gray7};
    border-radius: ${radiusM};

    font-size: 13px;

    &:last-child {
        margin-bottom: 0;
    }

    ${({ disabled }) =>
        !disabled &&
        `
            cursor: pointer;
            &:hover {
                border-color: ${gray8};
                background-color: ${gray4};
            }
        `}

    ${({ focused }) =>
        focused &&
        `
            border-color: ${gray8};
            background-color: ${gray4};
        `}

    ${({ ghost }) =>
        ghost &&
        `
            border: 0;
        `}
`;

const StyledIcon = styled.span`
    padding-right: ${gapS};
`;

export const MenuItem: React.FC<MenuItemProps> = ({
    icon,
    color,
    ghost,
    children,
    selected,
    focused,
    disabled,
    view,
    onClick,
    className,
}) => (
    <StyledMenuItem
        className={className}
        focused={focused}
        disabled={disabled}
        color={color}
        ghost={ghost}
        onClick={onClick}
    >
        {nullable(icon, () => (
            <StyledIcon>{icon}</StyledIcon>
        ))}
        <span>{children}</span>
        {nullable(selected, () => (
            <Dot view={view} />
        ))}
    </StyledMenuItem>
);

export default MenuItem;
