import React, {
    forwardRef,
    createContext,
    PropsWithChildren,
    useContext,
    useState,
    useCallback,
    useEffect,
} from 'react';
import styled, { CSSObject, css } from 'styled-components';
import {
    danger10,
    danger2,
    danger3,
    danger4,
    danger5,
    danger6,
    danger7,
    danger8,
    danger9,
    gapS,
    gapSm,
    gapXs,
    gray10,
    gray2,
    gray3,
    gray4,
    gray5,
    gray6,
    gray7,
    gray8,
    radiusS,
    textColor,
} from '@taskany/colors';
import colorLayer from 'color-layer';

import { nullable } from '../../utils';
import { ErrorPopup } from '../ErrorPopup';
import { Text } from '../Text/Text';

type Size = 's' | 'm' | 'l';

interface FormControlStylingProps {
    size: Size;
    variant: 'blank' | 'outline';
    view: 'default' | 'danger';
    flat?: 'top' | 'bottom' | 'both';
    brick?: 'left' | 'right' | 'center';
    inline?: boolean;
    hue?: [number, number];
    error?: boolean;
    disabled?: boolean;
}

interface FormControlProps
    extends Partial<Omit<FormControlStylingProps, 'view' | 'disabled'>>,
        React.HTMLAttributes<HTMLDivElement> {}

interface FormControlContext extends FormControlStylingProps {
    focused: boolean;
    setFocused: React.Dispatch<React.SetStateAction<boolean>>;
    setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
    id?: string;
}

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
}

interface FormControlErrorProps extends Omit<React.ComponentProps<typeof ErrorPopup>, 'err'> {
    error?: React.ComponentProps<typeof ErrorPopup>['err'];
}

const FormControlContext = createContext<FormControlContext | void>(undefined);

const fontSizeMap = {
    s: 11,
    m: 14,
    l: 24,
} as const;

const gapSizeMap = {
    s: {
        gap: gapXs,
        padding: [gapXs, gapS],
    },
    m: {
        gap: gapS,
        padding: [gapXs, gapS],
    },
    l: {
        gap: gapSm,
        padding: [gapXs, gapSm],
    },
} as const;

const cssVariable = {
    c: '--b-fc-color',
    ch: '--b-fc-color-hover',
    b: '--b-fc-bg-color',
    bh: '--b-fc-bg-color-hover',
    br: '--b-fc-border-color',
    brh: '--b-fc-border-color-hover',
    fns: '--b-fc-font-size',
    gap: '--b-fc-gap',
    pad: '--b-fc-padding',
} as const;

const viewVariantMap: {
    [key in FormControlStylingProps['view']]: CSSObject;
} = {
    default: {
        [cssVariable.c]: gray10,
        [cssVariable.ch]: textColor,
        [cssVariable.b]: gray4,
        [cssVariable.bh]: gray3,
        [cssVariable.br]: gray6,
        [cssVariable.brh]: gray7,
    },
    danger: {
        [cssVariable.c]: danger9,
        [cssVariable.ch]: danger10,
        [cssVariable.b]: danger5,
        [cssVariable.bh]: danger4,
        [cssVariable.br]: danger6,
        [cssVariable.brh]: danger7,
    },
};

const disabledVariantMap: {
    [key in FormControlStylingProps['view']]: CSSObject;
} = {
    default: {
        [cssVariable.c]: gray7,
        [cssVariable.ch]: gray8,
        [cssVariable.b]: gray3,
        [cssVariable.bh]: gray2,
        [cssVariable.br]: gray5,
        [cssVariable.brh]: gray6,
    },
    danger: {
        [cssVariable.c]: danger7,
        [cssVariable.ch]: danger8,
        [cssVariable.b]: danger3,
        [cssVariable.bh]: danger2,
        [cssVariable.br]: danger5,
        [cssVariable.brh]: danger6,
    },
};

const gapMixin = css<Pick<FormControlStylingProps, 'size'>>`
    ${({ size }) => {
        const { gap, padding } = gapSizeMap[size];

        return `
            ${cssVariable.gap}: ${gap};
            ${cssVariable.pad}: ${padding.join(' ')};
            gap: var(${cssVariable.gap});
        `;
    }}
`;

const sizeMixin = css<Pick<FormControlStylingProps, 'size'>>`
    ${({ size }) => ({ fontSize: `${fontSizeMap[size]}px`, [`${cssVariable.fns}`]: `${fontSizeMap[size]}px` })}
`;

const calcColorLevel = (level: number, disabled = false) => (disabled ? level - 1 : level);

const applyCSSVarsMixin = css<Pick<FormControlStylingProps, 'view' | 'hue' | 'disabled'>>`
    ${({ hue, view, disabled }) => {
        if (hue) {
            const [h, theme] = hue;
            const sat = h === 1 ? 0 : undefined;

            return `
                ${cssVariable.c}: ${colorLayer(h, calcColorLevel(9, disabled), sat)[theme]};
                ${cssVariable.ch}: ${colorLayer(h, calcColorLevel(10, disabled), sat)[theme]};
                ${cssVariable.b}: ${colorLayer(h, calcColorLevel(4, disabled), sat)[theme]};
                ${cssVariable.bh}: ${colorLayer(h, calcColorLevel(5, disabled), sat)[theme]};
                ${cssVariable.br}: ${colorLayer(h, calcColorLevel(2, disabled), sat)[theme]};
                ${cssVariable.brh}: ${colorLayer(h, calcColorLevel(3, disabled), sat)[theme]};
            `;
        }

        const currentMap = disabled ? disabledVariantMap : viewVariantMap;

        if (view) {
            return currentMap[view];
        }

        return currentMap.default;
    }}
`;

const variantMixin = css<Pick<FormControlStylingProps, 'variant' | 'error' | 'disabled'>>`
    border: 1px solid transparent;
    background-color: transparent;
    color: var(${cssVariable.c});

    &:hover:not([disabled]),
    &:focus-within:not([disabled]) {
        color: var(${cssVariable.ch});
        background-color: ${gray2};
    }

    ${({ variant, error }) =>
        (variant === 'outline' || error) &&
        `
            border-color: var(${cssVariable.br});

            &:hover:not([disabled]),
            &:focus-within:not([disabled]) {
                border-color: var(${cssVariable.brh});
            }
    `}

    transition: border-color 0.2s ease, background-color 0.2s ease, color 0.2s ease;
`;

const brickAndFlatMixin = css<Pick<FormControlStylingProps, 'brick' | 'flat'>>`
    border-radius: ${radiusS};

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

    ${({ brick, flat }) =>
        (brick === 'center' || flat === 'both') &&
        `
            border-radius: 0;
        `}
`;

const layoutMixin = css<Pick<FormControlStylingProps, 'inline'>>`
    ${({ inline }) =>
        !inline &&
        `
            flex-direction: column;
        `}

    ${({ inline }) =>
        inline &&
        `
            flex-direction: row;
            flex-wrap: nowrap;
            align-items: center;
        `}
`;

const StyledFormControl = styled.div<Pick<FormControlStylingProps, 'size' | 'view' | 'inline'>>`
    position: relative;
    display: flex;
    vertical-align: middle;
    box-sizing: border-box;

    ${sizeMixin}
    ${gapMixin}
    ${applyCSSVarsMixin}
    ${layoutMixin}
`;

const useFormControlContext = () => {
    const formContext = useContext(FormControlContext);

    if (!formContext) {
        throw new Error('FormContext is undefined');
    }

    return formContext;
};

export const FormControl = forwardRef<HTMLDivElement, PropsWithChildren<FormControlProps>>(
    ({ children, size = 'm', variant = 'blank', flat, brick, error, id, ...attrs }, ref) => {
        const [focused, setFocused] = useState(false);
        const [disabled, setDisabled] = useState(false);
        const calcView = error ? 'danger' : 'default';

        return (
            <FormControlContext.Provider
                value={{
                    error,
                    focused,
                    setFocused,
                    disabled,
                    setDisabled,
                    size,
                    id,
                    variant,
                    view: calcView,
                    flat,
                    brick,
                }}
            >
                <StyledFormControl size={size} view={calcView} ref={ref} {...attrs}>
                    {children}
                </StyledFormControl>
            </FormControlContext.Provider>
        );
    },
);

const StyledInput = styled.input`
    display: inline-flex;
    color: currentColor;
    font-size: inherit;
    background-color: inherit;
    border: 0;
    outline: none;
    caret-color: currentColor;
    flex: 1 0 auto;
    padding: 0;
    margin: 0;

    &:disabled {
        cursor: not-allowed;
    }
`;

const StyledFormInputWrapper = styled.span<
    Pick<FormControlStylingProps, 'variant' | 'view' | 'flat' | 'brick' | 'error' | 'disabled'>
>`
    display: flex;
    align-items: center;
    flex: 1;
    position: relative;
    gap: var(${cssVariable.gap});
    padding: var(${cssVariable.pad});

    ${variantMixin}
    ${brickAndFlatMixin}
`;

const StyledIconContainer = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    max-width: 24px;
    min-width: 15px;
`;

export const FormControlInput = forwardRef<HTMLInputElement, PropsWithChildren<FormInputProps>>(
    ({ iconLeft, iconRight, onFocus, onBlur, children, disabled, type = 'text', ...attrs }, ref) => {
        const { setFocused, id, setDisabled, variant, flat, view, brick, error } = useFormControlContext();

        useEffect(() => {
            setDisabled(!!disabled);
        }, [disabled]);

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
            <StyledFormInputWrapper variant={variant} view={view} flat={flat} brick={brick} error={error}>
                {nullable(iconLeft, (icon) => (
                    <StyledIconContainer>{icon}</StyledIconContainer>
                ))}
                <StyledInput
                    {...attrs}
                    disabled={disabled}
                    type={type}
                    id={id}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    ref={ref}
                />
                {nullable(iconRight, (icon) => (
                    <StyledIconContainer>{icon}</StyledIconContainer>
                ))}
                {children}
            </StyledFormInputWrapper>
        );
    },
);

export const FormControlError: React.FC<PropsWithChildren<FormControlErrorProps>> = ({ error, children, ...attrs }) => {
    const { focused } = useFormControlContext();

    return (
        <ErrorPopup visible={focused} err={error} {...attrs}>
            {children}
        </ErrorPopup>
    );
};

const StyledText = styled(Text)<{ error?: boolean }>`
    font-size: var(${cssVariable.fns});
    color: ${({ error, color }) => (error ? danger9 : color)};
`;

export const FormControlLabel: React.FC<Omit<React.ComponentProps<typeof Text>, 'size'>> = ({
    color = textColor,
    ...props
}) => {
    const { id, error } = useFormControlContext();

    return <StyledText as="label" color={color} {...props} htmlFor={id} error={error} />;
};
