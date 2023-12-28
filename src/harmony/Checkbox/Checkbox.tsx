import React, { forwardRef } from 'react';
import cn from 'classnames';

import { nullable } from '../../utils';

import classes from './Checkbox.module.css';

interface CheckboxProps extends React.HTMLAttributes<HTMLInputElement> {
    checked?: boolean;
    disabled?: boolean;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    label?: React.ReactNode;
    name: string;
    value?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ checked, onChange, label, name, className, ...rest }, ref) => (
        <label className={cn(classes.Checkbox, className)}>
            <input
                className={cn(classes.CheckboxInput)}
                type="checkbox"
                name={name}
                defaultChecked={checked}
                onChange={onChange}
                ref={ref}
                {...rest}
            />
            {nullable(label, (labelComponent) => labelComponent)}
        </label>
    ),
);
