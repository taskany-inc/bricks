import React, { useMemo } from 'react';
import cn from 'classnames';

import classes from './Text.module.css';

enum textSize {
    xxs = classes.TextSizeXss,
    xs = classes.TextSizeXs,
    s = classes.TextSizeS,
    m = classes.TextSizeM,
    l = classes.TextSizeL,
    xl = classes.TextSizeXl,
    xxl = classes.TextSizeXxl,
}

enum textWeight {
    bolder = classes.TextBolder,
    bold = classes.TextBold,
    regular = classes.TextRegular,
    thin = classes.TextThin,
    thinner = classes.TextThinner,
}

interface TextProps {
    className?: string;
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
    h1: React.JSX.IntrinsicElements['h1'];
    h2: React.JSX.IntrinsicElements['h2'];
    h3: React.JSX.IntrinsicElements['h3'];
    h4: React.JSX.IntrinsicElements['h4'];
    h5: React.JSX.IntrinsicElements['h5'];
    h6: React.JSX.IntrinsicElements['h6'];
}

type HeadingTagName = Extract<keyof AllowedHTMLElements, `h${number}`>;

const isHeading = (tag: keyof AllowedHTMLElements): tag is HeadingTagName => {
    return /^(h[1-6])/.test(tag);
};

const calcTextSizes = (tag: keyof AllowedHTMLElements, size: textSize, weight: textWeight = textWeight.regular) => {
    const headingClasses: Record<HeadingTagName, [textSize, textWeight]> = {
        h1: [textSize.xxl, textWeight.bolder],
        h2: [textSize.xl, textWeight.bolder],
        h3: [textSize.l, textWeight.regular],
        h4: [textSize.m, textWeight.bold],
        h5: [textSize.m, textWeight.regular],
        h6: [textSize.m, textWeight.thin],
    };

    if (isHeading(tag)) {
        return headingClasses[tag];
    }

    return [textSize[size], textWeight[weight]];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Text<T extends React.ComponentType<any>>(
    props: React.PropsWithChildren<TextProps> & { as?: T } & React.ComponentProps<T>,
): React.ReactElement<T>;
export function Text<T extends keyof AllowedHTMLElements>(
    props: React.PropsWithChildren<TextProps> & { as?: T } & AllowedHTMLElements[T],
): React.ReactElement<T>;
// cause there has overload
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Text(props: any) {
    const {
        as: Tag = defaultTagName,
        children,
        size = 'm',
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

    const ownProps = { size, weight, strike, wordBreak, wordWrap, lines, ellipsis, color } as TextProps;

    const textStyles = useMemo(() => {
        if (typeof Tag === 'string') {
            return calcTextSizes(Tag as keyof AllowedHTMLElements, size, weight);
        }

        return null;
    }, [Tag, size, weight]);

    const additionalStyles = useMemo(() => {
        const styles: Record<string, any> = {};

        switch (true) {
            case !!wordBreak:
                styles['--text-breaked'] = wordBreak;
                break;
            case !!wordWrap:
                styles['--text-wrapped'] = wordWrap;
                break;
            case !!lines:
                styles['--text-line-clamp'] = lines;
                break;
            case !!color:
                styles['--text-custom-color'] = color;
                break;
            default:
                break;
        }

        return styles as React.CSSProperties;
    }, [ownProps.strike, ownProps.wordBreak, ownProps.wordWrap, ownProps.lines, ownProps.ellipsis, ownProps.color]);

    return (
        <Tag
            {...rest}
            className={cn(classes.Text, textStyles, className, {
                [classes.TextEllipsis]: ellipsis,
                [classes.TextWrapped]: !!wordWrap,
                [classes.TextBreaked]: !!wordBreak,
                [classes.TextStrike]: strike,
                [classes.TextClamped]: !!lines,
                [classes.TextColored]: !!color,
            })}
            style={additionalStyles}
        >
            {children}
        </Tag>
    );
}
