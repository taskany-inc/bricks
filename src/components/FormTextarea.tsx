import React, { useContext } from 'react';
import styled from 'styled-components';
import { fontDisplay, gray2, gray3, gray7, radiusS, textColor } from '@taskany/colors';

import { formContext } from '../context/form';

interface FormTextareaProps extends React.HTMLAttributes<HTMLTextAreaElement> {
    id?: string;
    name?: string;
    value?: string | number;
    defaultValue?: string | number;
    tabIndex?: number;
    autoFocus?: boolean;
    autoComplete?: string;
    placeholder?: string;
    disabled?: boolean;
    flat?: 'top' | 'bottom' | 'both';
    minHeight?: number;
    error?: {
        message?: string;
    };
}

const StyledFormTextarea = styled(
    ({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        flat,
        forwardRef,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        minHeight,
        ...props
    }: FormTextareaProps & { forwardRef?: React.Ref<HTMLTextAreaElement> }) => <textarea ref={forwardRef} {...props} />,
)`
    display: block;
    box-sizing: border-box;
    outline: none;
    border: 0;
    border-radius: ${radiusS};
    background-color: ${gray3};
    font-family: ${fontDisplay};
    color: ${textColor};
    font-weight: 600;
    font-size: 16px;
    padding: 8px 16px;
    width: 100%;
    min-height: ${({ minHeight = 200 }) => `${minHeight}px`};
    resize: none;

    transition: 200ms cubic-bezier(0.3, 0, 0.5, 1);
    transition-property: color, background-color, border-color;

    &:focus:not([disabled]) {
        background-color: ${gray2};
    }

    &:hover:not([disabled]) {
        background-color: ${gray2};
    }

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

    ::placeholder {
        font-weight: 400;
        color: ${gray7};
    }
`;

export const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>((props, ref) => {
    const formCtx = useContext(formContext);
    const disabled = formCtx.disabled || props.disabled;

    return <StyledFormTextarea forwardRef={ref} {...props} disabled={disabled} />;
});
