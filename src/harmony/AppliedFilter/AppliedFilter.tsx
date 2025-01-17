import React, { ComponentProps, ReactNode } from 'react';
import cn from 'classnames';

import { Tag } from '../Tag/Tag';
import { Text } from '../Text/Text';

import s from './AppliedFilter.module.css';

interface AppliedFilterProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
    className?: string;
    label?: string;
    readOnly?: boolean;
    action?: ComponentProps<typeof Tag>['action'];
    color?: ComponentProps<typeof Tag>['color'];
    size?: ComponentProps<typeof Tag>['size'];
    children?: ReactNode;
}

export const AppliedFilter = ({ className, label, action, readOnly, children, ...props }: AppliedFilterProps) => {
    return (
        <Tag
            className={cn(s.AppliedFilter, { [s.AppliedFilter_readOnly]: readOnly }, className)}
            action={action}
            {...props}
        >
            <Text className={s.AppliedFilterLabel}>{label}</Text>
            <div className={s.AppliedFilterValue}>{children}</div>
        </Tag>
    );
};
