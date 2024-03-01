import React, { forwardRef } from 'react';
import cn from 'classnames';

import { nullable } from '../../utils';

import classes from './Radio.module.css';

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: React.ReactNode;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(({ label, className, checked, ...rest }, ref) => (
    <label
        className={cn(classes.Radio, className, {
            [classes.RadioDisabled]: rest.disabled,
            [classes.RadioReadonly]: rest.readOnly,
        })}
    >
        <input className={cn(classes.RadioInput)} type="radio" ref={ref} {...rest} defaultChecked={checked} />
        {nullable(label, (labelComponent) => (
            <span className={cn(classes.RadioLabel)}>{labelComponent}</span>
        ))}
    </label>
));
