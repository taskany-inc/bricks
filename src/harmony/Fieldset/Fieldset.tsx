import React from 'react';
import cn from 'classnames';

import { Text } from '../Text/Text';

import s from './Fieldset.module.css';

type FieldsetViewType = 'default' | 'warning' | 'danger';

interface FieldsetProps extends React.HTMLAttributes<HTMLFieldSetElement> {
    title?: string;
    view?: FieldsetViewType;
    children: React.ReactNode;
}

const viewMap: Record<FieldsetViewType, string> = {
    default: s.Fieldset_default,
    warning: s.Fieldset_warning,
    danger: s.Fieldset_danger,
};

export const Fieldset: React.FC<FieldsetProps> = ({ view = 'default', className, title, children, ...props }) => {
    return (
        <fieldset className={cn(s.Fieldset, className)} {...props}>
            <Text className={cn(s.Legend, viewMap[view])} as="legend" size="m" weight="bold">
                {title}
            </Text>

            {children}
        </fieldset>
    );
};
