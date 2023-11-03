import React from 'react';
import { gapXs, gray9 } from '@taskany/colors';
import styled from 'styled-components';

import { nullable } from '../utils/nullable';

import { Text } from './Text/Text';

interface TabLabelProps {
    text: string;
    selected?: string[];
}

const StyledLabelWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: ${gapXs};
    width: 100%;
`;

export const FilterTabLabel: React.FC<TabLabelProps> = ({ text, selected }) => (
    <StyledLabelWrapper>
        <Text color={gray9}>
            {text}
            {nullable(selected, () => ': ')}
        </Text>
        {nullable(selected, (list) => (
            <Text ellipsis wordBreak="break-all" lines={1} title={list.join(', ')}>
                {list.join(', ')}
            </Text>
        ))}
    </StyledLabelWrapper>
);
