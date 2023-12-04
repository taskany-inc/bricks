import React, { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';
import cn from 'classnames';

import { nullable } from '../../utils';

import s from './Button.module.css';

const viewMap = {
    default: s.button__default,
    primary: s.button__primary,
    ghost: s.button__ghost,
    danger: s.button__danger,
    warning: s.button__warning,
    checked: s.button__checked,
};

const brickMap = {
    left: s.brick__left,
    right: s.brick__right,
    center: s.brick__center,
};

const sizeMap = {
    xs: s.size__xs,
    s: s.size__s,
    m: s.size__m,
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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
        const classes = [s.button, viewMap[view], brick ? brickMap[brick] : '', sizeMap[size], className];

        return (
            <button className={cn(classes)} ref={ref} {...rest}>
                {nullable(
                    !text && icons,
                    ([icon]) => (
                        <span className={cn(s.icon, s.icon__single)}>{icon}</span>
                    ),
                    <>
                        {nullable(iconLeft, (icon) => (
                            <span className={cn(s.icon, s.icon__left)}>{icon}</span>
                        ))}
                        {nullable(text, (t) => (
                            <span>{t}</span>
                        ))}
                        {nullable(iconRight, (icon) => (
                            <span className={cn(s.icon, s.icon__right)}>{icon}</span>
                        ))}
                    </>,
                )}
            </button>
        );
    },
);
