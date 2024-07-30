import React, { FC, ComponentProps } from 'react';

import { Text } from '../Text/Text';

export const KanbanCardTitle: FC<ComponentProps<typeof Text>> = ({ children, ...rest }) => {
    return (
        <Text as="h4" {...rest}>
            {children}
        </Text>
    );
};
