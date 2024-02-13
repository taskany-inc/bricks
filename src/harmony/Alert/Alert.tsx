import React, { ReactNode } from 'react';
import cn from 'classnames';
import { IconExclamationCircleOutline, IconInfoCircleOutline } from '@taskany/icons';

import { nullable } from '../../utils/nullable';

import s from './Alert.module.css';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
    view: 'default' | 'danger' | 'warning';
    text: string;
    icon?: ReactNode;
}
const viewMap = {
    default: s.Alert_default,
    danger: s.Alert_danger,
    warning: s.Alert_warning,
};

const iconMap = {
    default: <IconInfoCircleOutline size="s" />,
    danger: <IconExclamationCircleOutline size="s" />,
    warning: <IconExclamationCircleOutline size="s" />,
};

export const Alert: React.FC<AlertProps> = ({ text, icon, className, view, ...props }) => {
    return (
        <div className={cn(s.Alert, viewMap[view], className)} {...props}>
            {nullable(icon, (i) => i, iconMap[view])}
            <span>{text}</span>
        </div>
    );
};
