import React from 'react';
import styled from 'styled-components';
import { gapS, gapXs, gray3, radiusM } from '@taskany/colors';

import { Text } from './Text/Text';

interface MarkedListItemProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    mark?: React.ReactNode;
    hoverColor?: string;
    focused?: boolean;
    checked?: boolean;

    onClick?: () => void;
}

const StyledItemCard = styled.div<Omit<MarkedListItemProps, 'mark' | 'onClick' | 'children'>>`
    display: flex;
    align-items: center;

    box-sizing: border-box;
    padding: ${gapXs} ${gapS};
    margin-bottom: ${gapS};
    min-width: 150px;

    border-radius: ${radiusM};

    cursor: pointer;

    &:last-child {
        margin-bottom: 0;
    }

    &:hover {
        background-color: ${gray3};
    }

    ${({ focused }) =>
        focused &&
        `
            background-color: ${gray3};
        `}

    ${({ checked, hoverColor }) =>
        checked &&
        hoverColor &&
        `
            background-color: ${hoverColor};
        `}

    ${({ hoverColor }) =>
        hoverColor &&
        `
            &:hover {
                background-color: ${hoverColor};
            }
        `}

    ${({ hoverColor, focused }) =>
        hoverColor &&
        focused &&
        `
            background-color: ${hoverColor};
        `}
`;

const StyledItemInfo = styled(Text)`
    padding-left: ${gapS};
`;

export const MarkedListItem: React.FC<MarkedListItemProps> = ({ mark, children, ...props }) => (
    <StyledItemCard {...props}>
        {mark}
        <StyledItemInfo size="s" weight="bold">
            {children}
        </StyledItemInfo>
    </StyledItemCard>
);
