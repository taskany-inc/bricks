import React from 'react';
import styled from 'styled-components';
import { gray3 } from '@taskany/colors';

import { KeyCode, KeyMod, useKeyboard } from '../hooks/useKeyboard';
import { formContext } from '../context/form';

interface FormProps {
    children: React.ReactNode;
    disabled?: boolean;
    submitHotkey?: Array<number>;

    onSubmit?: () => void;
}

const submitKeys = [KeyMod.CtrlCmd, KeyCode.Enter];

const StyledForm = styled.form`
    background-color: ${gray3};
`;

export const Form: React.FC<FormProps> = ({ children, disabled, submitHotkey = submitKeys, onSubmit }) => {
    const handleSubmit = (e?: React.SyntheticEvent) => {
        e?.preventDefault();

        onSubmit?.();
    };

    const [keyboard] = useKeyboard(submitHotkey, () => handleSubmit(), {
        disableGlobalEvent: disabled,
        capture: true,
    });

    return (
        <formContext.Provider value={{ disabled }}>
            <StyledForm {...keyboard} onSubmit={handleSubmit}>
                {children}
            </StyledForm>
        </formContext.Provider>
    );
};

export default Form;
