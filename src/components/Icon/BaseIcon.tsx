import React from 'react';
import styled from 'styled-components';

export const sizesMap = {
    xxs: 12,
    xs: 14,
    s: 15,
    m: 32,
    l: 48,
};

export interface BaseIconProps {
    size: keyof typeof sizesMap | number;
    value: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    color?: string;
    stroke?: number;
    className?: string;
    noWrap?: boolean;

    onClick?: (e: React.MouseEvent) => void;
}

const StyledIcon = styled.span<{ onClick?: BaseIconProps['onClick'] }>`
    ${({ onClick }) =>
        onClick &&
        `
            cursor: pointer;
        `}
`;

export const BaseIcon = React.forwardRef<HTMLSpanElement, BaseIconProps>(
    ({ size, value: Component, color = 'inherit', stroke = 1, className, onClick, noWrap }, ref) => {
        const sizePx = `${typeof size === 'string' ? sizesMap[size] : size}px`;
        const content = (
            <Component
                width={sizePx}
                height={sizePx}
                color={color}
                strokeWidth={stroke}
                onClick={onClick}
                style={{
                    cursor: onClick ? 'pointer' : 'default',
                }}
            />
        );

        return noWrap ? (
            content
        ) : (
            <StyledIcon ref={ref} className={className} style={{ lineHeight: 'initial' }} onClick={onClick}>
                {content}
            </StyledIcon>
        );
    },
);
