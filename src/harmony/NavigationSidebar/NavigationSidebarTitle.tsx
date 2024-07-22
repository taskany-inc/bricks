import React, { ComponentProps, FC } from 'react';
import cn from 'classnames';

import { Text } from '../Text/Text';

import s from './NavigationSidebar.module.css';

export const NavigationSidebarTitle: FC<ComponentProps<typeof Text>> = ({ children, className, ...rest }) => (
    <Text className={cn(s.NavigationSidebarTitle, className)} weight="bold" size="l" {...rest}>
        {children}
    </Text>
);
