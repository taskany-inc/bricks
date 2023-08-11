import React, { useContext, useCallback } from 'react';

import { nullable } from '../utils/nullable';
import { radioContext } from '../context/radio';
import { formContext } from '../context/form';

import { StyledFormRadioInput, StyledFormRadioInputContainer, StyledFormRadioInputLabel } from './FormRadio';

interface FormRadioInputProps extends React.HTMLAttributes<HTMLInputElement> {
    name?: string;
    label?: string;
    value: string;
    defaultValue?: string | number;
    tabIndex?: number;
    disabled?: boolean;
}

export const FormRadioInput: React.FC<FormRadioInputProps> = ({
    disabled: innerDisabled,
    value: innerValue,
    label,
    ...attrs
}) => {
    const { name, value, onChange } = useContext(radioContext);
    const formCtx = useContext(formContext);
    const disabled = formCtx.disabled || innerDisabled;

    const onRadioInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange && onChange(e.target.value);
        },
        [onChange],
    );

    return (
        <StyledFormRadioInputContainer>
            <StyledFormRadioInput
                type="radio"
                checked={innerValue === value}
                name={name}
                onChange={onRadioInputChange}
                id={innerValue}
                {...attrs}
                disabled={disabled}
            />
            {nullable(label, (l) => (
                <StyledFormRadioInputLabel as="label" htmlFor={innerValue}>
                    {l}
                </StyledFormRadioInputLabel>
            ))}
        </StyledFormRadioInputContainer>
    );
};
