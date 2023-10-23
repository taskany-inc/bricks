/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import styled, { css, createGlobalStyle } from 'styled-components';
import { fontDisplay, gapL, gapM, gapS, gapSm, gapXl, gapXs, textColor } from '@taskany/colors';

const textSizes = {
    xxs: '0.5rem',
    xs: '0.75rem',
    s: '0.875rem',
    m: '1rem',
    l: '1.25rem',
    xl: '1.75rem',
    xxl: '3rem',
};

const lineHeight = {
    xxs: '1.5',
    xs: '1.5',
    s: '1.5',
    m: '1.5',
    l: '1.15',
    xl: '1.15',
    xxl: '1',
};

const textWeight = {
    bolder: 800,
    bold: 600,
    regular: 400,
    thin: 300,
    thinner: 200,
};

const calcTextSize = (size: keyof typeof textSizes, weight: keyof typeof textWeight = 'regular') =>
    css`
        font-size: ${textSizes[size]};
        line-height: ${lineHeight[size]};
        font-weight: ${textWeight[weight]};
    `;

export interface TextProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: keyof typeof textSizes;
    weight?: keyof typeof textWeight;
    color?: string;
    ellipsis?: boolean;
    strike?: boolean;
    lines?: number;
    wordWrap?: React.CSSProperties['wordWrap'];
    wordBreak?: React.CSSProperties['wordBreak'];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    as?: string | React.ComponentType<any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    forwardRef?: any;
    children?: React.ReactNode;
}

export const Text = styled(
    ({
        color,
        as: Tag = 'div',
        size,
        weight,
        ellipsis,
        strike,
        lines,
        wordBreak,
        wordWrap,
        forwardRef,
        ...props
    }: TextProps) => <Tag ref={forwardRef} {...props} />,
)<TextProps>`
    font-size: 16px;
    font-family: ${fontDisplay};
    color: ${textColor};

    ${({ size }) => size && calcTextSize(size)}

    ${({ size }) =>
        size === 'xxl' &&
        css`
            letter-spacing: -0.015em;
        `}

    ${({ weight }) =>
        weight &&
        css`
            font-weight: ${textWeight[weight]};
        `}

    ${({ color }) =>
        color &&
        css`
            color: ${color};
        `}

    ${({ ellipsis }) =>
        ellipsis &&
        css`
            text-overflow: ellipsis;
            overflow: hidden;
        `}

    ${({ ellipsis, lines }) =>
        ellipsis &&
        lines &&
        css`
            display: -webkit-box;
            -webkit-line-clamp: ${lines};
            -webkit-box-orient: vertical;
        `}

    ${({ wordWrap }) =>
        wordWrap &&
        `
        word-wrap: ${wordWrap};
    `}

    ${({ wordBreak }) =>
        wordBreak &&
        `
        word-break: ${wordBreak};
    `}

    ${({ strike }) =>
        strike &&
        css`
            text-decoration: line-through;
        `}
`;

export const TextStyle = createGlobalStyle`
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    li {
        margin-top: 0;
        margin-bottom: 0;

        &:first-child {
            padding-top: 0;
        }
        &:last-child {
            padding-bottom: 0;
        }
    }

    h1 {
        letter-spacing: -0.015em;
        ${calcTextSize('xxl', 'bolder')}
        padding-bottom: ${gapM};
        padding-top: ${gapXl};
    }

    h2 {
        ${calcTextSize('xl', 'bolder')}
        padding-top: ${gapS};
        padding-bottom: ${gapM};
    }

    h3 {
        ${calcTextSize('l', 'regular')}
        padding-top: ${gapM};
        padding-bottom: ${gapS};
    }

    h4 {
        ${calcTextSize('m', 'bold')}
        padding-top: ${gapS};
        padding-bottom: ${gapS};
    }

    h5 {
        ${calcTextSize('m', 'regular')}
        padding-top: ${gapS};
        padding-bottom: ${gapS};
    }

    p,
    ul,
    ol {
        ${calcTextSize('m', 'regular')}
        padding-top: ${gapXs};
        padding-bottom: ${gapSm};
        &:first-child {
            padding-top: 0;
        }
        &:last-child {
            padding-bottom: 0;
        }
    }

    li {
        ${calcTextSize('m', 'regular')}
        padding-bottom: ${gapXs};
        &:first-child {
            padding-top: 0;
        }
        &:last-child {
            padding-bottom: 0;
        }
    }

    blockquote {
        padding: ${gapSm} ${gapSm} ${gapSm} ${gapL};
    }

    strong {
        background: transparent;
        font-weight: ${textWeight.bolder};
    }
`;
