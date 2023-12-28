import React, { ComponentProps } from 'react';
import cn from 'classnames';

import { Popup } from '../Popup/Popup';

import s from './Tooltip.module.css';

interface TooltipProps extends ComponentProps<typeof Popup> {
    view?: 'warning' | 'danger' | 'primary' | 'success';
}

const viewMap = {
    primary: s.Tooltip_primary,
    danger: s.Tooltip_danger,
    success: s.Tooltip_success,
    warning: s.Tooltip_warning,
};

export const Tooltip: React.FC<TooltipProps> = ({ className, view = 'primary', children, ...props }) => (
    <Popup className={cn(s.Tooltip, viewMap[view], className)} {...props}>
        {children}
    </Popup>
);
