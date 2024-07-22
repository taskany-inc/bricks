import React, { FC, HTMLAttributes, ReactNode, useState } from 'react';
import cn from 'classnames';
import { IconDownSmallOutline, IconUpSmallOutline } from '@taskany/icons';

import { nullable } from '../../utils';
import { Text } from '../Text/Text';
import { ListView } from '../ListView/ListView';

import s from './NavigationSidebar.module.css';

interface NavigationSectionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    title: ReactNode;
    collapsed?: boolean;
}

export const NavigationSection: FC<NavigationSectionProps> = ({
    collapsed: defaultState = false,
    title,
    children,
    className,
    ...rest
}) => {
    const [collapsed, setCollapsed] = useState(defaultState);
    return (
        <div className={cn(s.NavigationSection, className)} {...rest}>
            <div className={s.NavigationSectionTitle} onClick={() => setCollapsed((val) => !val)}>
                <Text size="xs">{title}</Text>
                {nullable(
                    collapsed,
                    () => (
                        <IconUpSmallOutline size="s" />
                    ),
                    <IconDownSmallOutline size="s" />,
                )}
            </div>
            {nullable(!collapsed, () => (
                <ListView>{children}</ListView>
            ))}
        </div>
    );
};
