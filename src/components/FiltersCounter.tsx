import React, { FC } from 'react';
import { textColor } from '@taskany/colors';

import { Badge } from './Badge';
import { Text } from './Text';

interface FiltersCounterProps extends React.HTMLAttributes<HTMLDivElement> {
    counter?: number;
    total: number;
}

export const FiltersCounter: FC<FiltersCounterProps> = ({ counter, total, ...attrs }) => (
    <Badge size="m" {...attrs}>
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
