/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
import React, { useMemo } from 'react';
import cn from 'classnames';

import s from './Text.module.css';

const textSize = {
    xxs: s.TextSizeXxs,
    xs: s.TextSizeXs,
    s: s.TextSizeS,
    sm: s.TextSizeSm,
    m: s.TextSizeM,
    ml: s.TextSizeMl,
    l: s.TextSizeL,
    lg: s.TextSizeLg,
    xl: s.TextSizeXl,
    xxl: s.TextSizeXxl,
};

const textWeight = {
    bolder: s.TextBolder,
    bold: s.TextBold,
    semiBold: s.TextSemiBold,
    regular: s.TextRegular,
    normal: s.TextNormal,
    thin: s.TextThin,
    thinner: s.TextThinner,
};

const headingClasses: Record<HeadingTagName, [string, string]> = {
    h1: [textSize.xxl, textWeight.bold],
    h2: [textSize.xl, textWeight.bold],
    h3: [textSize.l, textWeight.bold],
    h4: [textSize.m, textWeight.bold],
    h5: [textSize.ml, textWeight.regular],
    h6: [textSize.m, textWeight.thin],
};

interface TextProps {
    className?: string;
    children?: React.ReactNode;
    size?: keyof typeof textSize;
    weight?: keyof typeof textWeight;
    color?: string;
    ellipsis?: boolean;
    strike?: boolean;
    lines?: number;
    wordWrap?: React.CSSProperties['wordWrap'];
    wordBreak?: React.CSSProperties['wordBreak'];
}

const defaultTagName: keyof Pick<React.JSX.IntrinsicElements, 'div'> = 'div';
interface AllowedHTMLElements {
    div: React.JSX.IntrinsicElements['div'];
    p: React.JSX.IntrinsicElements['p'];
    span: React.JSX.IntrinsicElements['span'];
    i: React.JSX.IntrinsicElements['i'];
    b: React.JSX.IntrinsicElements['b'];
    strong: React.JSX.IntrinsicElements['strong'];
    label: React.JSX.IntrinsicElements['label'];
    h1: React.JSX.IntrinsicElements['h1'];
    h2: React.JSX.IntrinsicElements['h2'];
    h3: React.JSX.IntrinsicElements['h3'];
    h4: React.JSX.IntrinsicElements['h4'];
    h5: React.JSX.IntrinsicElements['h5'];
    h6: React.JSX.IntrinsicElements['h6'];
    legend: React.JSX.IntrinsicElements['legend'];
    ol: React.JSX.IntrinsicElements['ol'];
    ul: React.JSX.IntrinsicElements['ul'];
    li: React.JSX.IntrinsicElements['li'];
    blockquote: React.JSX.IntrinsicElements['blockquote'];
}

type HeadingTagName = Extract<keyof AllowedHTMLElements, `h${number}`>;
const isHeading = (tag: string): tag is HeadingTagName => /^(h[1-6])/.test(tag);

const calcTextSizes = (tag: string, size?: keyof typeof textSize, weight: keyof typeof textWeight = 'regular') =>
    isHeading(tag) ? headingClasses[tag] : [size ? textSize[size] : undefined, textWeight[weight]];

export const Text = React.forwardRef(function <T extends keyof AllowedHTMLElements>(
    props: TextProps & { as?: T } & AllowedHTMLElements[T],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ref: React.ForwardedRef<any>,
) {
    const {
        as,
        children,
        size,
        weight = 'regular',
        className,
        strike,
        wordBreak,
        wordWrap,
        lines,
        ellipsis,
        color,
        ...rest
    } = props;
    const Tag: string = as || defaultTagName;

    const ownProps = { size, weight, strike, wordBreak, wordWrap, lines, ellipsis, color } as TextProps;

    const textStyles = useMemo(() => calcTextSizes(Tag, size, weight), [Tag, size, weight]);

    const additionalStyles: React.CSSProperties = useMemo(() => {
        const styles: Record<string, unknown> = { ...rest.style };

        if (wordBreak) {
            styles['--text-breaked'] = wordBreak;
        }

        if (wordWrap) {
            styles['--text-wrapped'] = wordWrap;
        }

        if (lines) {
            styles['--text-line-clamp'] = lines;
        }
        if (color) {
            styles['--text-custom-color'] = color;
        }

        return styles;
    }, [ownProps.wordBreak, ownProps.wordWrap, ownProps.lines, ownProps.color, rest.style]);

    return (
        <Tag
            {...rest}
            ref={ref}
            className={cn(s.Text, textStyles, className, {
                [s.TextEllipsis]: ellipsis,
                [s.TextWrapped]: !!wordWrap,
                [s.TextBreaked]: !!wordBreak,
                [s.TextStrike]: strike,
                [s.TextClamped]: !!lines,
                [s.TextColored]: !!color,
            })}
            style={additionalStyles}
        >
            {children}
        </Tag>
    );
});
