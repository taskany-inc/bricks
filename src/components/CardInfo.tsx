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

interface CardInfoProps {
    className?: string;
    children?: React.ReactNode;
    onClick?: () => void;
}

export const CardInfo: React.FC<CardInfoProps> = ({ className, children, onClick }) => (
    <StyledCardInfo className={className} size="xs" weight="bold" color={gray8} onClick={onClick}>
        {children}
    </StyledCardInfo>
);

export default CardInfo;
