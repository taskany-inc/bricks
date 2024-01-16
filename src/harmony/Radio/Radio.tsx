import React, { forwardRef } from 'react';
import cn from 'classnames';

import { nullable } from '../../utils';

import classes from './Radio.module.css';

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: React.ReactNode;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
    ({ label, className, disabled, checked, ...rest }, ref) => (
        <label
            className={cn(classes.Radio, className, {
                [classes.RadioDisabled]: disabled,
            })}
        >
            <input
                className={cn(classes.RadioInput)}
                type="radio"
                ref={ref}
                disabled={disabled}
                {...rest}
                defaultChecked={checked}
            />
            {nullable(label, (labelComponent) => (
                <span className={cn(classes.RadioLabel)}>{labelComponent}</span>
            ))}
        </label>
    ),
);
