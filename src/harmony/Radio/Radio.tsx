import React, { forwardRef } from 'react';
import cn from 'classnames';

import { nullable } from '../../utils';

import classes from './Radio.module.css';

interface RadioProps extends React.HTMLAttributes<HTMLInputElement> {
    checked?: boolean;
    disabled?: boolean;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    label?: React.ReactNode;
    name: string;
    value?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
    ({ checked, onChange, label, name, className, ...rest }, ref) => (
        <span className={cn(classes.Radio, className)}>
            <input
                className={cn(classes.RadioInput)}
                type="radio"
                name={name}
                defaultChecked={checked}
                onChange={onChange}
                ref={ref}
                {...rest}
            />
            {nullable(label, (labelComponent) => labelComponent)}
        </span>
    ),
);
