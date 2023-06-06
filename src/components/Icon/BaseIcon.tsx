import React from 'react';
import styled from 'styled-components';

export const iconSizesMap = {
    xxs: 12,
    xs: 14,
    s: 15,
    m: 32,
    l: 48,
};

export interface BaseIconProps {
    size: keyof typeof iconSizesMap | number;
    value: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    color?: string;
    stroke?: number;
    className?: string;
    noWrap?: boolean;

    onClick?: (e: React.MouseEvent) => void;
}

const StyledIcon = styled.span<{ onClick?: BaseIconProps['onClick']; color?: BaseIconProps['color'] }>`
    ${({ color }) =>
        color &&
        `
        color: ${color};
    `}

    ${({ onClick }) =>
        onClick &&
        `
            cursor: pointer;
        `}
`;

export const BaseIcon = React.forwardRef<HTMLSpanElement, BaseIconProps>(
    ({ size, value: Component, color = 'inherit', stroke = 1, className, onClick, noWrap }, ref) => {
        const sizePx = `${typeof size === 'string' ? iconSizesMap[size] : size}px`;
        const content = <Component width={sizePx} height={sizePx} strokeWidth={stroke} onClick={onClick} />;

        return noWrap ? (
            content
        ) : (
            <StyledIcon
                ref={ref}
                className={className}
                style={{ lineHeight: 'initial' }}
                color={color}
                onClick={onClick}
            >
                {content}
            </StyledIcon>
        );
    },
);
