import React from 'react';
import cn from 'classnames';
import { BaseIcon } from '@taskany/icons';

import { nullable } from '../../utils';

import s from './CircleProgressBar.module.css';

const sizeMap = {
    xxs: 12,
    xs: 14,
    s: 15,
    m: 32,
    l: 48,
};

interface CircleProgressBarProps extends React.HTMLAttributes<HTMLSpanElement> {
    value: number;
    size?: keyof typeof sizeMap;
    hideValue?: boolean;
    className?: string;
}

const allowedTextSizes: Record<keyof typeof sizeMap, string | null> = {
    s: null,
    m: s.Text_size_m,
    l: s.Text_size_l,
    xs: null,
    xxs: null,
};

export const CircleProgressBar: React.FC<CircleProgressBarProps> = ({
    value,
    size = 'm',
    hideValue,
    className,
    ...props
}) => {
    const diameter = sizeMap[size];
    const strokeWidth = 3;
    const radius = diameter / 2;
    const circumReference = 2 * Math.PI * radius;
    if (value > 100) value = 100;
    if (value < 0) value = 0;
    const offset = circumReference - (value / 100) * circumReference;

    return (
        <BaseIcon
            className={cn(s.ProgressBar, className)}
            size={size}
            value={(svgProps) => (
                <>
                    {nullable(allowedTextSizes[size] || hideValue, () => (
                        <span className={cn(s.Text, allowedTextSizes[size])}>{value}</span>
                    ))}

                    <svg
                        {...svgProps}
                        viewBox={`${-strokeWidth / 2} ${-strokeWidth / 2} ${diameter + strokeWidth} ${
                            diameter + strokeWidth
                        }`}
                        width={diameter}
                        height={diameter}
                    >
                        <circle
                            className={s.Circle_background}
                            cx={radius}
                            cy={radius}
                            r={radius}
                            fill="none"
                            strokeWidth={strokeWidth}
                        />
                        <circle
                            className={s.Circle_overlay}
                            cx={radius}
                            cy={radius}
                            r={radius}
                            fill="none"
                            strokeWidth={strokeWidth}
                            strokeDasharray={circumReference}
                            strokeDashoffset={offset}
                            strokeLinecap="round"
                            transform={`rotate(-90 ${radius} ${radius})`}
                        />
                    </svg>
                </>
            )}
            {...props}
        />
    );
};
