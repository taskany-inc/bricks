import React, { CSSProperties, InputHTMLAttributes, MutableRefObject, ReactNode, forwardRef, useMemo } from 'react';
import cn from 'classnames';

import { nullable } from '../../utils';

import s from './Input.module.css';

const viewMap = {
    default: s.Input_default,
    success: s.Input_success,
    danger: s.Input_danger,
};

const brickMap = {
    top: s.Input_brick_top,
    right: s.Input_brick_right,
    bottom: s.Input_brick_bottom,
    left: s.Input_brick_left,
    center: s.Input_brick_center,
};

const sizeMap = {
    xs: s.Input_size_xs,
    s: s.Input_size_s,
    m: s.Input_size_m,
};

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    forwardedRef?: MutableRefObject<HTMLDivElement | null>;
    pointerEvents?: CSSProperties['pointerEvents'];
    outline?: boolean;
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
    view?: keyof typeof viewMap;
    brick?: keyof typeof brickMap;
    size?: keyof typeof sizeMap;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            iconLeft,
            iconRight,
            view = 'default',
            brick,
            size = 's',
            autoComplete = 'none',
            outline,
            pointerEvents,
            forwardedRef,
            ...rest
        },
        ref,
    ) => {
        const wrapperStyles: Record<string, unknown> = useMemo(() => {
            const wrapper: Record<string, unknown> = {};

            if (pointerEvents) {
                wrapper['--input-pointer-events'] = pointerEvents;
            }

            return wrapper;
        }, [pointerEvents]);

        return (
            <div
                className={cn(
                    s.InputWrapper,
                    { [s.InputWrapper_brick]: brick },
                    { [s.InputWrapper_icon_left]: iconLeft },
                    { [s.InputWrapper_icon_right]: iconRight },
                    className,
                )}
                style={wrapperStyles}
                ref={forwardedRef}
            >
                <input
                    className={cn(s.Input, viewMap[view], sizeMap[size], brick ? brickMap[brick] : '', {
                        [s.Input_outline]: outline,
                    })}
                    ref={ref}
                    autoComplete={autoComplete}
                    {...rest}
                />

                {nullable(iconLeft, (icon) => (
                    <span className={cn(s.Icon, s.Icon_left)}>{icon}</span>
                ))}

                {nullable(iconRight, (icon) => (
                    <span className={cn(s.Icon, s.Icon_right)}>{icon}</span>
                ))}
            </div>
        );
    },
);
