import React, { forwardRef } from 'react';
import cn from 'classnames';

import { nullable } from '../../utils';

import classes from './Checkbox.module.css';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: React.ReactNode;
    view?: 'default' | 'rounded';
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ label, className, view = 'default', ...rest }, ref) => (
        <label
            className={cn(classes.Checkbox, className, {
                [classes.CheckboxDisabled]: rest.disabled,
                [classes.CheckboxRounded]: view === 'rounded',
                [classes.CheckboxReadonly]: rest.readOnly,
            })}
        >
            <input className={cn(classes.CheckboxInput)} type="checkbox" ref={ref} {...rest} />
            {nullable(label, (labelComponent) => (
                <span className={cn(classes.CheckboxLabel)}>{labelComponent}</span>
            ))}
        </label>
    ),
);
