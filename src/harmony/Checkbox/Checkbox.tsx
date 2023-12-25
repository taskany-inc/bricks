import React, { forwardRef, useCallback, useState } from 'react';
import cn from 'classnames';

import { nullable } from '../../utils';

import classes from './Checkbox.module.css';

interface CheckboxProps extends React.HTMLAttributes<HTMLInputElement> {
    checked?: boolean;
    disabled?: boolean;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    label?: React.ReactNode;
    name: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ checked, onChange, label, name, className, ...rest }, ref) => {
        const [innerState, setInnerState] = useState(() => checked);

        const onChangeHandler = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
            (event) => {
                setInnerState((prev) => !prev);

                onChange(event);
            },
            [onChange],
        );

        return (
            <label className={cn(classes.Checkbox, className)}>
                <input
                    className={cn(classes.CheckboxInput)}
                    type="checkbox"
                    name={name}
                    defaultChecked={checked}
                    checked={innerState}
                    onChange={onChangeHandler}
                    ref={ref}
                    {...rest}
                />
                {nullable(label, (labelComponent) => labelComponent)}
            </label>
        );
    },
);
