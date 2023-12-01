import React, { InputHTMLAttributes, ReactNode, forwardRef } from 'react';
import cn from 'classnames';

import { nullable } from '../../utils';

import s from './Input.module.css';

const viewMap = {
    default: s.Input_default,
    success: s.Input_success,
    danger: s.Input_danger,
};

const brickMap = {
    left: s.Input_brick_left,
    right: s.Input_brick_right,
    center: s.Input_brick_center,
};

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
    view?: keyof typeof viewMap;
    brick?: keyof typeof brickMap;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, iconLeft, iconRight, view = 'default', brick, ...rest }, ref) => {
        const classes = [s.Input, viewMap[view], brick ? brickMap[brick] : '', className];

        return (
            <div
                className={cn(
                    s.Wrapper,
                    brick ? s.InputWrapper_brick : '',
                    iconLeft ? s.Wrapper_icon_left : '',
                    iconRight ? s.Wrapper_icon_right : '',
                )}
            >
                <input className={cn(classes)} ref={ref} {...rest} />

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
