import React from 'react';
import styled from 'styled-components';
import { danger0, gapXs, gray7, gray8, warn0 } from '@taskany/colors';

import { nullable } from '../../utils';
import { Text } from '../Text/Text';

interface TipProps {
    children: React.ReactNode;
    title?: string;
    icon?: React.ReactNode;
    size?: React.ComponentProps<typeof Text>['size'];
    className?: string;
    view?: 'warning' | 'danger' | 'primary';
}

const colorsMap = {
    primary: gray7,
    danger: danger0,
    warning: warn0,
};

const StyledTip = styled(Text)``;

const StyledTipIcon = styled.span`
    display: inline-block;
    vertical-align: middle;
    margin-right: ${gapXs};
`;

const StyledTipTitle = styled(Text)`
    margin-right: ${gapXs};
`;

export const Tip: React.FC<TipProps> = ({ children, title, icon, view = 'primary', size = 's', className }) => {
    return (
        <StyledTip size={size} color={colorsMap[view]} className={className}>
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
