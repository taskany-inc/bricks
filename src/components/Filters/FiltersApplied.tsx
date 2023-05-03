import React from 'react';
import styled from 'styled-components';
import { gapM, gray7 } from '@taskany/colors';

import { Text } from '../Text';

import { useFilterContext } from './FiltersPanel';

interface FiltersPanelAppliedProps {
    fields?: string[];
}

const StyledApplied = styled(Text)`
    display: block;

    margin-top: -10px;
    padding: 0 40px ${gapM} 45px;
`;

export const FiltersApplied: React.FC<FiltersPanelAppliedProps> = ({ fields }) => {
    const { state } = useFilterContext();

    const order = fields || Object.keys(state);

    const infoString = order.reduce((acum, filterId) => {
        const filter = state[filterId];

        if (filter && filter.value.length) {
            acum += `${filter.title}: ${filter.value
                .map((id) => filter.getValueDescriptor(id)?.name ?? id)
                .join(', ')}. `;
        }

        return acum;
    }, '');

    return (
        <StyledApplied size="s" weight="bold" color={gray7}>
            {infoString}
        </StyledApplied>
    );
};
