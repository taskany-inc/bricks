import React from 'react';
import styled from 'styled-components';
import { gapXs, gray7, gray8 } from '@taskany/colors';

import { nullable } from '../../utils';
import { Text } from '../Text/Text';

interface TipProps {
    children: React.ReactNode;
    title?: string;
    icon?: React.ReactNode;
    size?: React.ComponentProps<typeof Text>['size'];
    className?: string;
}

const StyledTip = styled(Text)``;

const StyledTipIcon = styled.span`
    display: inline-block;
    vertical-align: middle;
    margin-right: ${gapXs};
`;

const StyledTipTitle = styled(Text)`
    margin-right: ${gapXs};
`;

export const Tip: React.FC<TipProps> = ({ children, title, icon, size = 's', className }) => {
    return (
        <StyledTip size={size} color={gray7} className={className}>
            {nullable(icon, (i) => (
                <StyledTipIcon>{i}</StyledTipIcon>
            ))}

            {nullable(title, (t) => (
                <StyledTipTitle as="span" size={size} weight="bold" color={gray8}>
                    {t}
                </StyledTipTitle>
            ))}

            {children}
        </StyledTip>
    );
};
