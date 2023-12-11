import React, { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';
import cn from 'classnames';

import { nullable } from '../../utils';

import s from './Button.module.css';

const viewMap = {
    default: s.Button_default,
    primary: s.Button_primary,
    ghost: s.Button_ghost,
    danger: s.Button_danger,
    warning: s.Button_warning,
    checked: s.Button_checked,
};

const brickMap = {
    left: s.Button_brick_left,
    right: s.Button_brick_right,
    center: s.Button_brick_center,
};

const sizeMap = {
    xs: s.Button_size_xs,
    s: s.Button_size_s,
    m: s.Button_size_m,
};

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    text?: string;
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
    view?: keyof typeof viewMap;
    brick?: keyof typeof brickMap;
    size?: keyof typeof sizeMap;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, iconLeft, iconRight, text, view = 'default', brick, size = 's', ...rest }, ref) => {
        const icons = [iconLeft, iconRight].filter(Boolean);
        const classes = [
            s.Button,
            viewMap[view],
            sizeMap[size],
            brick ? [s.Button_brick, brickMap[brick]] : '',
            className,
        ];

        return (
            <button className={cn(classes)} ref={ref} {...rest}>
                {nullable(
                    !text && icons,
                    ([icon]) => (
                        <span className={cn(s.Icon, s.Icon_center)}>{icon}</span>
                    ),
                    <>
                        {nullable(iconLeft, (icon) => (
                            <span className={cn(s.Icon, s.Icon_left)}>{icon}</span>
                        ))}
                        {nullable(text, (t) => (
                            <span className={s.Text}>{t}</span>
                        ))}
                        {nullable(iconRight, (icon) => (
                            <span className={cn(s.Icon, s.Icon_right)}>{icon}</span>
                        ))}
                    </>,
                )}
            </button>
        );
    },
);
