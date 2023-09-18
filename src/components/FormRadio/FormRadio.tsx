import React from 'react';
import styled from 'styled-components';
import { gapS, gray3, radiusS } from '@taskany/colors';

import { Text } from '../Text/Text';
import { RadioGroup, RadioGroupLabel } from '../Radio/Radio';
import { nullable } from '../../utils';

interface FormRadioProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    name: string;
    label?: string;
    value?: string;
    flat?: 'top' | 'bottom' | 'both';
    children?: React.ReactNode;

    onChange: (v: string) => void;
}

export const StyledFormRadioInputContainer = styled.div`
    padding: 8px 16px;

    & + & {
        padding-left: 0;
    }
`;
export const StyledFormRadioInput = styled.input``;
export const StyledFormRadioInputLabel = styled(Text)`
    padding-left: ${gapS};
`;

const StyledFormRadio = styled(RadioGroup)<{ flat: FormRadioProps['flat'] }>`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    position: relative;

    border-radius: ${radiusS};

    background-color: ${gray3};

    ${({ flat }) =>
        flat === 'top' &&
        `
            border-top-left-radius: 0;
            border-top-right-radius: 0;
        `}

    ${({ flat }) =>
        flat === 'bottom' &&
        `
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
        `}

    ${({ flat }) =>
        flat === 'both' &&
        `
            border-radius: 0;
        `}
`;

const StyledRadioGroupLabel = styled(RadioGroupLabel)`
    padding: 8px 8px 8px 16px;
`;

export const FormRadio: React.FC<FormRadioProps> = ({ name, label, value, flat, children, onChange, ...attrs }) => {
    return (
        <StyledFormRadio flat={flat} name={name} value={value} onChange={onChange} {...attrs}>
            {nullable(label, (l) => (
                <StyledRadioGroupLabel size="m">{l}:</StyledRadioGroupLabel>
            ))}
            {children}
        </StyledFormRadio>
    );
};
