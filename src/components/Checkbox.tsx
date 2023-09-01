import React, { forwardRef, useCallback } from 'react';
import { gapS, gray7 } from '@taskany/colors';
import styled from 'styled-components';

import { nullable } from '../utils';

import { Text } from './Text';

interface CheckboxProps extends React.HTMLAttributes<HTMLInputElement> {
    checked: boolean;
    value: string;
    name: string;
    disabled?: boolean;
    tabIndex?: number;
    label?: string;
    className?: string;
    onClick: (value: unknown) => void;
}

const StyledLabel = styled.label`
    display: flex;
    flex-wrap: nowrap;
    flex-basis: auto;
`;

const StyledInput = styled.input`
    padding-right: ${gapS};
`;

export const Checkbox = forwardRef<HTMLInputElement, React.PropsWithChildren<CheckboxProps>>(
    ({ onClick, checked, value, name, label, className, children, ...attrs }, ref) => {
        const handleOnChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
            onClick(event.target.value);
        }, []);

        return (
            <StyledLabel className={className}>
                <StyledInput
                    type="checkbox"
                    name={name}
                    value={value}
                    defaultChecked={checked}
                    ref={ref}
                    onChange={handleOnChange}
                    {...attrs}
                />
                {nullable(label, (l) => (
                    <Text size="s" color={gray7}>
                        {l}
                    </Text>
                ))}
                {children}
            </StyledLabel>
        );
    },
);
