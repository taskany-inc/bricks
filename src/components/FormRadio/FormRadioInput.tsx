import React, { useContext } from 'react';
import styled from 'styled-components';
import { gapS } from '@taskany/colors';

import { formContext } from '../../context/form';
import { Radio, RadioLabel } from '../Radio/Radio';
import { Text } from '../Text/Text';

const StyledRadio = styled(Radio)`
    align-items: baseline;
    padding: 8px 16px;

    & + & {
        padding-left: 0;
    }
`;

const StyledFormRadioInputLabel = styled(Text)`
    padding-left: ${gapS};
`;

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
    const formCtx = useContext(formContext);
    const disabled = formCtx.disabled || innerDisabled;

    return (
        <StyledRadio value={innerValue} disabled={disabled} {...attrs}>
            <RadioLabel>
                <StyledFormRadioInputLabel>{label}</StyledFormRadioInputLabel>
            </RadioLabel>
        </StyledRadio>
    );
};
