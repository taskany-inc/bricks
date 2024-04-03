import React, { forwardRef } from 'react';
import cn from 'classnames';

import { Text } from '../Text/Text';
import { nullable } from '../../utils';

import s from './Badge.module.css';

type TextPropsKeys = Exclude<keyof React.ComponentProps<typeof Text>, 'as' | 'size'>;

const defaultTagName: keyof Pick<React.JSX.IntrinsicElements, 'span'> = 'span';
interface AllowedHTMLElements {
    div: React.JSX.IntrinsicElements['div'];
    p: React.JSX.IntrinsicElements['p'];
    span: React.JSX.IntrinsicElements['span'];
    i: React.JSX.IntrinsicElements['i'];
    b: React.JSX.IntrinsicElements['b'];
    strong: React.JSX.IntrinsicElements['strong'];
    label: React.JSX.IntrinsicElements['label'];
}

type TextBadgeProps = Pick<
    React.ComponentProps<typeof Text>,
    TextPropsKeys | keyof React.HTMLAttributes<HTMLSpanElement>
>;

interface BadgeProps extends TextBadgeProps {
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    view?: 'default' | 'outline';
    size?: 's' | 'm' | 'l' | 'xl';
    text?: React.ReactNode;
    color?: string;
    as?: keyof AllowedHTMLElements;
    action?: 'dynamic' | 'static';
}

const sizeMap = {
    s: s.BadgeSizeS,
    m: s.BadgeSizeM,
    l: s.BadgeSizeL,
    xl: s.BadgeSizeXl,
};

export const Badge = forwardRef(
    <T extends keyof AllowedHTMLElements>(
        props: BadgeProps & { as?: T } & AllowedHTMLElements[T],
        ref: React.ForwardedRef<any>,
    ) => {
        const {
            iconLeft,
            iconRight,
            text,
            className,
            view = 'default',
            size = 's',
            weight = 'bold',
            as = defaultTagName,
            action = 'static',
            ...rest
        } = props;

        return (
            <Text
                as={as}
                ref={ref}
                weight={weight}
                size={size}
                {...rest}
                className={cn(
                    s.Badge,
                    className,
                    {
                        [s.BadgeOutlined]: view === 'outline',
                    },
                    sizeMap[size],
                )}
            >
                {nullable(iconLeft, (icon) => (
                    <span className={cn(s.BadgeIcon, { [s.BadgeIconLeft]: text })}>{icon}</span>
                ))}
                {nullable(text, (t) => (
                    <span>{t}</span>
                ))}
                {nullable(iconRight, (icon) => (
                    <span
                        className={cn(
                            s.BadgeIcon,
                            { [s.BadgeIconRight]: text },
                            { [s.BadgeAction]: action === 'dynamic' },
                        )}
                    >
                        {icon}
                    </span>
                ))}
            </Text>
        );
    },
);
