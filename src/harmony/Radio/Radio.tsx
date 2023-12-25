import React, { forwardRef, useCallback, useState } from 'react';
import cn from 'classnames';

import { nullable } from '../../utils';

import classes from './Radio.module.css';

interface RadioProps extends React.HTMLAttributes<HTMLInputElement> {
    checked?: boolean;
    disabled?: boolean;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    label?: React.ReactNode;
    name: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
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
            <label className={cn(classes.Radio, className)}>
                <input
                    className={cn(classes.RadioInput)}
                    type="radio"
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
