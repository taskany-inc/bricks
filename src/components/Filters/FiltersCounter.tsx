import React, { FC } from 'react';
import styled from 'styled-components';
import { gapS, textColor } from '@taskany/colors';

import Badge from '../Badge';
import Text from '../Text';

export const FiltersCounter: FC<{ counter?: number; total: number }> = ({ counter, total }) => (
    <Badge size="m">
        {counter === undefined || total === counter ? (
            total
        ) : (
            <>
                <Text weight="bold" color={textColor} size="xs" as="span">
                    {counter}
                </Text>
                {` / ${total}`}
            </>
        )}
    </Badge>
);

export const FiltersCounterContainer = styled.div`
    padding-left: ${gapS};
`;
