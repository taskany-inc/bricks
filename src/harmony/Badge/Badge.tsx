import React from 'react';
import cn from 'classnames';

import { Text } from '../Text/Text';
import { nullable } from '../../utils';

import s from './Badge.module.css';

type TextPropsKeys = Exclude<keyof React.ComponentProps<typeof Text>, 'as' | 'size'>;

type TextBadgeProps = Pick<
    React.ComponentProps<typeof Text>,
    TextPropsKeys | keyof React.HTMLAttributes<HTMLSpanElement>
>;

interface BadgeProps extends TextBadgeProps {
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    view?: 'default' | 'outline';
    size?: 's' | 'm' | 'l' | 'xl';
    text?: string;
    color?: string;
}

const sizeMap = {
    s: s.BadgeSizeS,
    m: s.BadgeSizeM,
    l: s.BadgeSizeL,
    xl: s.BadgeSizeXl,
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
    ({ iconLeft, iconRight, text, className, view = 'default', size = 's', weight = 'bold', ...rest }, ref) => {
        return (
            <Text
                ref={ref}
                className={cn(
                    s.Badge,
                    className,
                    {
                        [s.BadgeOutlined]: view === 'outline',
                    },
                    sizeMap[size],
                )}
                as="span"
                weight={weight}
                size={size}
                {...rest}
            >
                {nullable(iconLeft, (icon) => (
                    <span className={s.BadgeIconLeft}>{icon}</span>
                ))}
                {nullable(text, (t) => t)}
                {nullable(iconRight, (icon) => (
                    <span className={s.BadgeIconRight}>{icon}</span>
                ))}
            </Text>
        );
    },
);
