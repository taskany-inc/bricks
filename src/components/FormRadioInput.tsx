import React, { useContext, useCallback } from 'react';

import { nullable } from '../utils/nullable';
import { radioContext } from '../context/radio';
import { formContext } from '../context/form';

import { StyledFormRadioInput, StyledFormRadioInputContainer, StyledFormRadioInputLabel } from './FormRadio';

interface FormRadioInputProps {
    name?: string;
    label?: string;
    value: string;
    defaultValue?: string | number;
    tabIndex?: number;
    disabled?: boolean;
}

export const FormRadioInput: React.FC<FormRadioInputProps> = (props) => {
    const { name, value, onChange } = useContext(radioContext);
    const formCtx = useContext(formContext);
    props.disabled = formCtx.disabled || props.disabled;

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
                checked={props.value === value}
                name={name}
                onChange={onRadioInputChange}
                id={props.value}
                {...props}
            />
            {nullable(props.label, (l) => (
                <StyledFormRadioInputLabel as="label" htmlFor={props.value}>
                    {l}
                </StyledFormRadioInputLabel>
            ))}
        </StyledFormRadioInputContainer>
    );
};

export default FormRadioInput;
