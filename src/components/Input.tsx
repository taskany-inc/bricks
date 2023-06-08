import React from 'react';
import styled from 'styled-components';
import { gray10, gray3, gray4, gray6, gray7, textColor } from '@taskany/colors';

import { nullable } from '../utils';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    view?: 'default' | 'primary' | 'warning' | 'danger';
    brick?: 'left' | 'right' | 'center';
    size?: 's' | 'm';
    forwardRef?: React.Ref<HTMLInputElement>;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
}

const StyledInputContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

const StyledIconContainer = styled.div<{ size: InputProps['size']; position: 'left' | 'right' }>`
    position: absolute;

    ${({ size, position }) =>
        size === 'm' &&
        position === 'left' &&
        `
            left: 9px; // 8 + 1
        `}

    ${({ size, position }) =>
        size === 'm' &&
        position === 'right' &&
        `
            right: 9px; // 8 + 1
        `}
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledInput = styled(({ forwardRef, size, view, brick, iconLeft, iconRight, ...props }: InputProps) => (
    <input ref={forwardRef} {...props} />
))`
    box-sizing: border-box;
    width: 100%;

    font-weight: 500;

    outline: none;
    border: 1px solid;

    transition: 200ms cubic-bezier(0.3, 0, 0.5, 1);
    transition-property: color, background-color, border-color;

    ${({ view }) =>
        view === 'default' &&
        `
            color: ${gray10};
            border-color: ${gray6};
            background-color: ${gray4};

            :hover:not([disabled]),
            :focus:not([disabled]) {
                color: ${textColor};
                border-color: ${gray7};
                background-color: ${gray3};
            }
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
    
    ${({ size }) =>
        size === 'm' &&
        `
            padding: 5px 8px;

            font-size: 13px;
        `}

    ${({ size, iconLeft }) =>
        size === 'm' &&
        iconLeft &&
        `
            padding-left: 30px; // 8 + 8 + 15 - 1
        `}

    ${({ size, iconRight }) =>
        size === 'm' &&
        iconRight &&
        `
            padding-right: 30px; // 8 + 8 + 15 - 1
        `}
`;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ view = 'default', size = 'm', brick, iconLeft, iconRight, ...props }, ref) =>
        iconLeft || iconRight ? (
            <StyledInputContainer>
                {nullable(iconLeft, () => (
                    <StyledIconContainer size={size} position="left">
                        {iconLeft}
                    </StyledIconContainer>
                ))}

                <StyledInput forwardRef={ref} view={view} size={size} brick={brick} iconLeft={iconLeft} {...props} />

                {nullable(iconRight, () => (
                    <StyledIconContainer size={size} position="right">
                        {iconRight}
                    </StyledIconContainer>
                ))}
            </StyledInputContainer>
        ) : (
            <StyledInput forwardRef={ref} view={view} size={size} brick={brick} {...props} />
        ),
);

export default Input;
