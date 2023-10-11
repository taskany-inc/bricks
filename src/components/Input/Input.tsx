import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { gray10, gray3, gray4, gray6, gray7, radiusM, textColor } from '@taskany/colors';

import { nullable } from '../../utils';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    view?: 'default' | 'primary' | 'warning' | 'danger';
    brick?: 'left' | 'right' | 'center';
    size?: 's' | 'm';
    forwardRef?: React.Ref<HTMLInputElement>;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
}

const StyledInputContainer = styled.div<Pick<InputProps, 'size' | 'view' | 'brick'> & { focused?: boolean }>`
    position: relative;
    display: flex;
    align-items: center;
    box-sizing: border-box;

    gap: 9px;

    border: 1px solid;

    border-radius: ${radiusM};
    ${({ size }) => size === 'm' && 'padding: 5px 8px;'}

    transition: 200ms cubic-bezier(0.3, 0, 0.5, 1);
    transition-property: color, background-color, border-color;

    ${({ view }) =>
        view === 'default' &&
        `
            color: ${gray10};
            border-color: ${gray6};
            background-color: ${gray4};

            :hover {
                color: ${textColor};
                border-color: ${gray7};
                background-color: ${gray3};
            }
        `}

    ${({ view, focused }) =>
        view === 'default' &&
        focused &&
        `
            color: ${textColor};
            border-color: ${gray7};
            background-color: ${gray3};
    `}

    ${({ brick }) =>
        brick === 'left' &&
        `
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        `}

    ${({ brick }) =>
        brick === 'right' &&
        `
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
        `}

    ${({ brick }) =>
        brick === 'center' &&
        `
            border-radius: 0;
        `}
`;

const StyledIconContainer = styled.div<{ size: InputProps['size'] }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    max-width: 24px;
    min-width: 15px;
`;

const StyledInput = styled(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    React.forwardRef<HTMLInputElement, InputProps>(({ size, view, brick, iconLeft, iconRight, ...props }, ref) => (
        <input ref={ref} {...props} />
    )),
)`
    flex: 1;
    font-weight: 500;
    outline: none;
    ${({ size }) => size === 'm' && 'font-size: 13px;'}
    border: 0;
    margin: 0;
    padding: 0;
    background-color: transparent;
`;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ view = 'default', size = 'm', brick, iconLeft, iconRight, className, onFocus, onBlur, ...props }, ref) => {
        const [focused, setFocused] = useState(props.autoFocus);

        const handleFocus = useCallback<React.FocusEventHandler<HTMLInputElement>>(
            (event) => {
                setFocused(true);
                onFocus?.(event);
            },
            [onFocus],
        );
        const handleBlur = useCallback<React.FocusEventHandler<HTMLInputElement>>(
            (event) => {
                setFocused(false);
                onBlur?.(event);
            },
            [onBlur],
        );

        return (
            <StyledInputContainer size={size} brick={brick} view={view} focused={focused} className={className}>
                {nullable(iconLeft, () => (
                    <StyledIconContainer size={size}>{iconLeft}</StyledIconContainer>
                ))}

                <StyledInput ref={ref} size={size} {...props} onFocus={handleFocus} onBlur={handleBlur} />

                {nullable(iconRight, () => (
                    <StyledIconContainer size={size}>{iconRight}</StyledIconContainer>
                ))}
            </StyledInputContainer>
        );
    },
);
