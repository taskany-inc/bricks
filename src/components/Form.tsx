import React from 'react';
import styled from 'styled-components';
import { gray3 } from '@taskany/colors';

import { KeyCode, KeyMod, useKeyboard } from '../hooks/useKeyboard';
import { formContext } from '../context/form';

interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
    children: React.ReactNode;
    disabled?: boolean;
    submitHotkey?: Array<number>;

    onSubmit?: () => void;
}

const submitKeys = [KeyMod.CtrlCmd, KeyCode.Enter];

// TODO: https://github.com/taskany-inc/bricks/issues/448
const StyledForm = styled.form`
    background-color: ${gray3};
`;

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
