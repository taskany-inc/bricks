import React from 'react';
import styled from 'styled-components';
import { gray4, gray8, radiusM } from '@taskany/colors';

import { Text } from './Text';

const StyledCardInfo = styled(Text)`
    position: relative;
    box-sizing: border-box;
    padding: 4px 14px;

    background-color: ${gray4};

    border-top-left-radius: ${radiusM};
    border-top-right-radius: ${radiusM};
`;

interface CardInfoProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    children?: React.ReactNode;
    onClick?: (e?: React.MouseEvent<HTMLDivElement>) => void;
}

export const CardInfo: React.FC<CardInfoProps> = ({ children, ...props }) => (
    <StyledCardInfo size="xs" weight="bold" color={gray8} {...props}>
        {children}
    </StyledCardInfo>
);
