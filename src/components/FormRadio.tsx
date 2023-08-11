import React from 'react';
import styled from 'styled-components';
import { gapS, gray3, gray8, radiusS } from '@taskany/colors';

import { nullable } from '../utils/nullable';
import { radioContext } from '../context/radio';

import { Text } from './Text';

interface FormRadioBaseProps {
    name?: string;
    label?: string;
    value?: string;
    flat?: 'top' | 'bottom' | 'both';
    children?: React.ReactNode;

    onChange?: (v: FormRadioBaseProps['value']) => void;
}

type FormRadioProps = FormRadioBaseProps & React.HTMLAttributes<HTMLDivElement>;

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

const StyledFormRadio = styled.div<{ flat: FormRadioProps['flat'] }>`
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

const StyledFormRadioLabel = styled(Text)`
    padding: 8px 8px 8px 16px;

    background-color: transparent;
`;

export const FormRadio: React.FC<FormRadioProps> = ({ name, label, value, flat, children, onChange, ...attrs }) => {
    return (
        <radioContext.Provider value={{ name, value, onChange }}>
            <StyledFormRadio flat={flat} {...attrs}>
                {nullable(label, (l) => (
                    <StyledFormRadioLabel as="label" size="m" color={gray8} weight="bold">
                        {l}:
                    </StyledFormRadioLabel>
                ))}

                {children}
            </StyledFormRadio>
        </radioContext.Provider>
    );
};
