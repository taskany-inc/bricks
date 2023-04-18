import React from 'react';
import styled from 'styled-components';
import { gray3 } from '@taskany/colors';

import { useKeyboard } from '../hooks/useKeyboard';
import { formContext } from '../context/form';

interface FormProps {
    children: React.ReactNode;
    disabled?: boolean;
    submitHotkey?: Array<number>;

    onSubmit?: () => void;
}

const StyledForm = styled.form`
    background-color: ${gray3};
`;

export const Form: React.FC<FormProps> = ({ children, disabled, submitHotkey, onSubmit }) => {
    const handleSubmit = (e?: React.SyntheticEvent) => {
        e?.preventDefault();

        onSubmit?.();
    };

    const [keyboard] = useKeyboard(submitHotkey || [], () => handleSubmit(), {
        disableGlobalEvent: false,
        capture: true,
    });

    return (
        <StyledForm {...keyboard} onSubmit={handleSubmit}>
            <formContext.Provider value={{ disabled }}>{children}</formContext.Provider>
        </StyledForm>
    );
};

export default Form;
