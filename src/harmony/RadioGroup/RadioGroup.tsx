import React, { createContext, useContext, useId } from 'react';
import cn from 'classnames';

import { Radio } from '../Radio/Radio';

import classes from './RadioGroup.module.css';

const RadioGroupContext = createContext<{
    name: string;
    value?: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}>({
    name: 'unknown',
    onChange: () => {},
});

interface RadioControlProps extends React.InputHTMLAttributes<HTMLInputElement> {
    value: string;
}

interface RadioGroupProps {
    name: string;
    value?: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    className?: string;
}

export const RadioGroupLabel: React.FC<React.PropsWithChildren<React.HTMLAttributes<HTMLSpanElement>>> = ({
    children,
    className,
    ...props
}) => (
    <span className={cn(classes.RadioGroupLabel, className)} {...props}>
        {children}
    </span>
);

export const RadioControl: React.FC<React.PropsWithChildren<RadioControlProps>> = ({
    value,
    disabled,
    className,
    children,
    ...attrs
}) => {
    const id = useId();
    const { name, onChange, value: selected } = useContext(RadioGroupContext);

    return (
        <Radio
            className={cn(classes.RadioControl, className)}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            id={`${id}-${name}`}
            checked={value === selected}
            label={children}
            {...attrs}
        />
    );
};

export const RadioGroup: React.FC<React.PropsWithChildren<RadioGroupProps>> = ({
    name,
    onChange,
    children,
    value,
    className,
    ...attrs
}) => (
    <RadioGroupContext.Provider value={{ name, value, onChange }}>
        <div className={cn(classes.RadioGroupWrapper, className)} {...attrs}>
            {children}
        </div>
    </RadioGroupContext.Provider>
);
