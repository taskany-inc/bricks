/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from 'react';
import styled from 'styled-components';
import {
    textColor,
    gray5,
    gray7,
    gray8,
    danger9,
    warn1,
    warn2,
    warn4,
    warn9,
    warn10,
    warn5,
    warn0,
    gray6,
    gray9,
    gray10,
    danger4,
    danger5,
    danger10,
    gray4,
    danger1,
    danger2,
    radiusM,
    primary10,
    primary9,
    primary7,
    primary6,
    primary1,
    primary2,
} from '@taskany/colors';
import colorLayer from 'color-layer';

import { formContext } from '../context/form';
import { nullable } from '../utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string;
    title?: string;
    ghost?: boolean;
    view?: 'default' | 'primary' | 'warning' | 'danger';
    outline?: boolean;
    size?: 's' | 'm' | 'l';
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    brick?: 'left' | 'right' | 'center';
    /** This property is applicable only when the 'view' prop is set to 'default'. */
    checked?: boolean;
    hue?: [number, number];
    children?: React.ReactNode;
}

const StyledIcon = styled.span`
    display: flex;
    align-items: center;
`;
const StyledText = styled.span``;

const StyledButton = styled(
    ({
        forwardRef,
        size,
        view,
        brick,
        iconRight,
        iconLeft,
        ghost,
        outline,
        ...props
    }: ButtonProps & { forwardRef?: React.Ref<HTMLButtonElement> }) => <button ref={forwardRef} {...props} />,
)`
    position: relative;
    box-sizing: border-box;

    white-space: nowrap;

    outline: none;
    appearance: none;

    border: 1px solid;
    border-radius: ${radiusM};

    transition: 200ms cubic-bezier(0.3, 0, 0.5, 1);
    transition-property: color, background-color, border-color;

    :disabled {
        cursor: not-allowed;
        transition: none;

        color: ${gray8};
        border-color: ${gray6};
        background-color: ${gray5};
    }

    &[type='submit']:not([disabled]) {
        cursor: pointer;
        user-select: none;

        :active:not([disabled]) {
            transform: scale(0.985);
        }
    }

    ${({ onClick }) =>
        onClick &&
        `
            cursor: pointer;
            user-select: none;

            :active:not([disabled]) {
                transform: scale(0.985);
            }
        `}

    ${({ view, checked }) =>
        view === 'default' &&
        `
            color: ${gray10};
            border-color: ${gray7};
            background-color: ${checked ? gray6 : gray4};

            --color: ${gray9};
            --color-hover: ${gray10};
            --bkg-color: ${gray4};
            --bkg-color-hover: ${gray5};

            :hover:not([disabled]),
            :focus:not([disabled]) {
                color: ${textColor};
                border-color: ${gray8};
                background-color: ${gray6};
            }
        `}

    ${({ view }) =>
        view === 'primary' &&
        `
            color: ${primary1};
            border-color: ${primary10};
            background-color: ${primary9};

            --color: ${primary10};
            --color-hover: ${primary10};
            --bkg-color: ${primary6};
            --bkg-color-hover: ${primary7};

            :hover:not([disabled]),
            :focus:not([disabled]) {
                color: ${primary2};
                border-color: ${primary10};
                background-color: ${primary10};
            }
        `}

    ${({ view }) =>
        view === 'warning' &&
        `
            color: ${warn1};
            border-color: ${warn0};
            background-color: ${warn0};

            --color: ${warn9};
            --color-hover: ${warn10};
            --bkg-color: ${warn4};
            --bkg-color-hover: ${warn5};

            :hover:not([disabled]),
            :focus:not([disabled]) {
                color: ${warn2};
                border-color: ${warn10};
                background-color: ${warn10};
            }
        `}

    ${({ view }) =>
        view === 'danger' &&
        `
            color: ${danger1};
            border-color: ${danger9};
            background-color: ${danger9};

            --color: ${danger9};
            --color-hover: ${danger10};
            --bkg-color: ${danger4};
            --bkg-color-hover: ${danger5};

            :hover:not([disabled]),
            :focus:not([disabled]) {
                color: ${danger2};
                border-color: ${danger10};
                background-color: ${danger10};
            }
        `}

    ${({ hue }) => {
        if (hue) {
            const [h, theme] = hue;
            const sat = h === 1 ? 0 : undefined;

            return `
                --color: ${colorLayer(h, 9, sat)[theme]};
                --color-hover: ${colorLayer(h, 10, sat)[theme]};
                --bkg-color: ${colorLayer(h, 4, sat)[theme]};
                --bkg-color-hover: ${colorLayer(h, 5, sat)[theme]};
            `;
        }

        return false;
    }}

    ${({ outline }) =>
        outline &&
        `
            background-color: var(--bkg-color);

            color: var(--color);

            border-color: var(--color);

            :hover:not([disabled]),
            :focus:not([disabled]) {
                color: var(--color-hover);

                background-color: var(--bkg-color-hover);

                border-color: var(--color-hover);
            }
        `}

    ${({ size }) =>
        size &&
        {
            s: `
                padding: 3px 12px;

                font-size: 12px;
            `,
            m: `
                min-height: 28px;
                padding: 5px 16px;

                font-size: 13px;

                ${StyledIcon} {
                    width: 15px;
                    height: 15px;
                }

                ${StyledIcon} + ${StyledText},
                ${StyledText} + ${StyledIcon} {
                    padding-left: 8px;
                }
            `,
            l: `
                padding: 0.6em 1.5em;

                font-size: 16px;
            `,
        }[size]}

    ${({ iconRight, iconLeft, size }) =>
        size === 'm' &&
        (iconRight || iconLeft) &&
        `
            padding: 5px 10px;
        `}

    ${({ brick }) =>
        brick &&
        {
            left: `
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
            `,
            right: `
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
            `,
            center: `
                border-radius: 0;
            `,
        }[brick]}

    ${({ ghost }) =>
        ghost &&
        `
            border-color: transparent;
            background-color: ${gray5};
        `}
`;

const Aligner = styled.span`
    display: flex;
    align-items: center;
`;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ text, view = 'default', size = 'm', type = 'button', disabled: internalDisabled, ...props }, ref) => {
        const formCtx = useContext(formContext);
        const disabled = formCtx.disabled || internalDisabled;

        const content =
            props.iconLeft || props.iconRight ? (
                <>
                    {nullable(props.iconLeft, (i) => (
                        <StyledIcon>{i}</StyledIcon>
                    ))}
                    {nullable(text, (t) => (
                        <StyledText>{t}</StyledText>
                    ))}
                    {nullable(props.iconRight, (i) => (
                        <StyledIcon>{i}</StyledIcon>
                    ))}
                </>
            ) : (
                nullable(text, (t) => <StyledText>{t}</StyledText>)
            );

        return (
            <StyledButton
                type={type}
                view={view}
                size={size}
                tabIndex={disabled ? -1 : undefined}
                disabled={disabled}
                {...props}
                forwardRef={ref}
            >
                <Aligner>{content}</Aligner>
            </StyledButton>
        );
    },
);
