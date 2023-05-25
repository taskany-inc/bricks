import React from 'react';
import { brandColor, gray5 } from '@taskany/colors';
import styled from 'styled-components';

import Text from './Text';

interface CircleProgressBarProps {
    value: number;
    size?: 's' | 'm' | 'l'; // default: 'm'
}

const sizeMap = {
    s: 18,
    m: 24,
    l: 32,
};

const StyledCircleProgressWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledCircleProgressValue = styled.span`
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const CircleProgressBar = ({ value, size = 'm' }: CircleProgressBarProps) => {
    const diameter = sizeMap[size];
    const strokeWidth = size === 's' ? 2 : 3;
    const radius = diameter / 2;
    const circumReference = 2 * Math.PI * radius;
    if (value > 100) value = 100;
    if (value < 0) value = 0;
    const offset = circumReference - (value / 100) * circumReference;
    return (
        <StyledCircleProgressWrapper>
            <StyledCircleProgressValue>
                <Text weight="bold" color={brandColor} size={size === 'l' ? 'xs' : 'xxs'} as="span">
                    {value}
                </Text>
            </StyledCircleProgressValue>
            <svg
                viewBox={`${-strokeWidth / 2} ${-strokeWidth / 2} ${diameter + strokeWidth} ${diameter + strokeWidth}`}
                width={diameter}
                height={diameter}
                className="svg"
            >
                <circle cx={radius} cy={radius} r={radius} fill="none" stroke={gray5} strokeWidth={strokeWidth} />
                <circle
                    cx={radius}
                    cy={radius}
                    r={radius}
                    fill="none"
                    stroke={brandColor}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumReference}
                    strokeDashoffset={offset}
                    transform={`rotate(-90 ${radius} ${radius})`}
                />
            </svg>
        </StyledCircleProgressWrapper>
    );
};

export default CircleProgressBar;
