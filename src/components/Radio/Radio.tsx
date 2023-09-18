import React, { createContext, forwardRef, useCallback, useId } from 'react';
import styled from 'styled-components';
import { gray8 } from '@taskany/colors';

import { Text } from '../Text/Text';

const RadioContext = createContext<{
    id: string;
    name: string;
    value?: string;
    disabled?: boolean;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}>({
    id: 'unknown',
    name: 'unknown',
    onChange: () => {},
});

const RadioGroupContext = createContext<{
    name: string;
    value?: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}>({
    name: 'unknown',
    onChange: () => {},
});

interface RadioLabelProps extends React.HTMLAttributes<HTMLLabelElement> {
    id?: never;
}

interface RadioInputProps extends React.HTMLAttributes<HTMLInputElement> {
    name: string;
    id: string;
    checked: boolean;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

interface RadioProps extends React.HTMLAttributes<HTMLDivElement> {
    value: string;
    disabled?: boolean;
}

interface RadioGroupProps {
    name: string;
    value?: string;
    onChange: (value: string) => void;
    className?: string;
}

const StyledRadioGroup = styled.div``;
const StyledRadioLabel = styled.label``;

const StyledRadioWrapper = styled.div`
    display: flex;
    flex-wrap: nowrap;
    flex-basis: auto;
    align-items: center;
`;

export const RadioGroupLabel: React.FC<React.ComponentProps<typeof Text>> = ({ children, ...props }) => (
    <Text as="label" color={gray8} weight="bold" {...props}>
        {children}
    </Text>
);

export const RadioLabel: React.FC<React.PropsWithChildren<RadioLabelProps>> = ({ children, ...attrs }) => (
    <RadioContext.Consumer>
        {({ id }) => (
            <StyledRadioLabel htmlFor={id} {...attrs}>
                {children}
            </StyledRadioLabel>
        )}
    </RadioContext.Consumer>
);

const RadioInput = forwardRef<HTMLInputElement, RadioInputProps>(({ id, value, name, onChange, checked }, ref) => {
    return (
        <input id={id} type="radio" name={name} defaultChecked={checked} ref={ref} onChange={onChange} value={value} />
    );
});

export const Radio: React.FC<React.PropsWithChildren<RadioProps>> = ({ children, value, disabled, ...attrs }) => {
    const id = useId();

    return (
        <RadioGroupContext.Consumer>
            {({ name, onChange, value: selected }) => (
                <RadioContext.Provider value={{ id: `${id}-${name}`, value, onChange, name, disabled }}>
                    <StyledRadioWrapper {...attrs}>
                        <RadioInput
                            name={name}
                            value={value}
                            onChange={onChange}
                            id={`${id}-${name}`}
                            checked={value === selected}
                        />
                        {children}
                    </StyledRadioWrapper>
                </RadioContext.Provider>
            )}
        </RadioGroupContext.Consumer>
    );
};

export const RadioGroup: React.FC<React.PropsWithChildren<RadioGroupProps>> = ({
    name,
    onChange,
    children,
    value,
    ...attrs
}) => {
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
        (event) => {
            onChange(event.target.value);
        },
        [onChange],
    );

    return (
        <RadioGroupContext.Provider value={{ name, value, onChange: handleChange }}>
            <StyledRadioGroup {...attrs}>{children}</StyledRadioGroup>
        </RadioGroupContext.Provider>
    );
};
