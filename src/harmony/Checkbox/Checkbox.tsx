import React, { forwardRef } from 'react';
import cn from 'classnames';

import { nullable } from '../../utils';

import classes from './Checkbox.module.css';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: React.ReactNode;
    view?: 'default' | 'rounded';
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ label, className, disabled, view = 'default', ...rest }, ref) => (
        <label
            className={cn(classes.Checkbox, className, {
                [classes.CheckboxDisabled]: disabled,
                [classes.CheckboxRounded]: view === 'rounded',
            })}
        >
            <input className={cn(classes.CheckboxInput)} type="checkbox" ref={ref} disabled={disabled} {...rest} />
            {nullable(label, (labelComponent) => (
                <span className={cn(classes.CheckboxLabel)}>{labelComponent}</span>
            ))}
        </label>
    ),
);
