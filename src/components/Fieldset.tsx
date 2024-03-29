import React from 'react';
import styled from 'styled-components';
import { danger0, gapM, gapS, gray9, warn0 } from '@taskany/colors';

import { Text } from './Text/Text';

type FieldsetViewType = 'default' | 'warning' | 'danger';

interface FieldsetProps extends React.HTMLAttributes<HTMLFieldSetElement> {
    title?: string;
    view?: FieldsetViewType;
    children: React.ReactNode;
    className?: string;
}

const StyledFieldset = styled.fieldset`
    border: 0;

    padding: ${gapM} 0 0 0;
    margin: 0;
`;

const StyledLegend = styled(Text)`
    padding: ${gapS} ${gapM} 0;
`;

const colorsMap: Record<FieldsetViewType, string> = {
    default: gray9,
    warning: warn0,
    danger: danger0,
};

export const Fieldset: React.FC<FieldsetProps> = ({ view = 'default', title, children, ...props }) => {
    return (
        <StyledFieldset {...props}>
            <StyledLegend as="legend" size="m" weight="bold" color={colorsMap[view]}>
                {title}
            </StyledLegend>

            {children}
        </StyledFieldset>
    );
};
