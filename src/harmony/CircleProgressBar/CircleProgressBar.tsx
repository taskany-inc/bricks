import React from 'react';
import cn from 'classnames';

import s from './CircleProgressBar.module.css';

interface CircleProgressBarProps extends React.HTMLAttributes<HTMLSpanElement> {
    value: number;
    size?: 'm' | 'l';
    className?: string;
}

const sizeMap = {
    m: 24,
    l: 32,
};

export const CircleProgressBar: React.FC<CircleProgressBarProps> = ({ value, size = 'm', className, ...props }) => {
    const diameter = sizeMap[size];
    const strokeWidth = 3;
    const radius = diameter / 2;
    const circumReference = 2 * Math.PI * radius;
    if (value > 100) value = 100;
    if (value < 0) value = 0;
    const offset = circumReference - (value / 100) * circumReference;

    return (
        <span className={cn(s.ProgressBar, className)} {...props}>
            <span className={cn(s.Text, size === 'l' ? s.Text_size_l : s.Text_size_m)}>{value}</span>
            <svg
                viewBox={`${-strokeWidth / 2} ${-strokeWidth / 2} ${diameter + strokeWidth} ${diameter + strokeWidth}`}
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
        </span>
    );
};
