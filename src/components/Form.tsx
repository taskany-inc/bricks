import React from 'react';
import styled from 'styled-components';

import { KeyCode, KeyMod, useKeyboard } from '../hooks/useKeyboard';
import { formContext } from '../context/form';

interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
    children: React.ReactNode;
    disabled?: boolean;
    submitHotkey?: Array<number>;
    className?: string;

    onSubmit?: () => void;
}

const submitKeys = [KeyMod.CtrlCmd, KeyCode.Enter];

const StyledForm = styled.form``;

export const Form: React.FC<FormProps> = ({ children, disabled, submitHotkey = submitKeys, onSubmit, ...attrs }) => {
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
            <StyledForm {...keyboard} onSubmit={handleSubmit} {...attrs}>
                {children}
            </StyledForm>
        </formContext.Provider>
    );
};
