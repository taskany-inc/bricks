import React, { createContext, forwardRef, useCallback, useId } from 'react';
import styled from 'styled-components';

interface CheckboxProps extends React.HTMLAttributes<HTMLDivElement> {
    name: string;
    className?: string;
    onClick: (value: unknown) => void;
}

const StyledWrapper = styled.div`
    display: flex;
    flex-wrap: nowrap;
    flex-basis: auto;
    align-items: center;
`;

const CheckboxContext = createContext<{
    id: string;
    name: string;
    onClick: React.ChangeEventHandler<HTMLInputElement>;
}>({
    id: 'unknown',
    name: 'unknown',
    onClick: () => {},
});

export const CheckboxLabel: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className, children }) => (
    <CheckboxContext.Consumer>
        {({ id }) => (
            <label htmlFor={id} className={className}>
                {children}
            </label>
        )}
    </CheckboxContext.Consumer>
);

interface CheckboxInputProps extends React.HTMLAttributes<HTMLInputElement> {
    value: string;
    checked?: boolean;
    defaultChecked?: boolean;
}

export const CheckboxInput = forwardRef<HTMLInputElement, CheckboxInputProps>(({ value, ...attrs }, ref) => (
    <CheckboxContext.Consumer>
        {({ id, onClick, name }) => (
            <input id={id} type="checkbox" name={name} value={value} ref={ref} onChange={onClick} {...attrs} />
        )}
    </CheckboxContext.Consumer>
));

export const Checkbox = forwardRef<HTMLDivElement, React.PropsWithChildren<CheckboxProps>>(
    ({ onClick, name, className, children, ...attr }, ref) => {
        const handleOnChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
            onClick(event.target.value);
        }, []);

        const id = useId();

        return (
            <CheckboxContext.Provider value={{ id: `${name}-${id}`, onClick: handleOnChange, name }}>
                <StyledWrapper className={className} {...attr} ref={ref}>
                    {children}
                </StyledWrapper>
            </CheckboxContext.Provider>
        );
    },
);
