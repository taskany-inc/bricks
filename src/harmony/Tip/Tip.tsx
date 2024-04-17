import React, { FC, HTMLAttributes } from 'react';
import cn from 'classnames';

import { Text } from '../Text/Text';
import { nullable } from '../../utils/nullable';
import { Badge } from '../Badge/Badge';

import s from './Tip.module.css';

const viewMap = {
    primary: s.Tip_primary,
    danger: s.Tip_danger,
    warning: s.Tip_warning,
};

interface TipProps extends HTMLAttributes<HTMLDivElement> {
    title?: string;
    icon?: React.ReactNode;
    view?: keyof typeof viewMap;
}

export const Tip: FC<TipProps> = ({ children, view = 'primary', className, title, icon, ...attrs }) => {
    return (
        <Badge
            className={cn(viewMap[view], className)}
            iconLeft={icon}
            weight="regular"
            size="s"
            text={
                <>
                    {nullable(title, (t) => (
                        <Text className={s.TipTitle} as="span" weight="bold">
                            {t}{' '}
                        </Text>
                    ))}
                    {children}
                </>
            }
            {...attrs}
        />
    );
};
