import React from 'react';
import cn from 'classnames';

import { Text } from '../Text/Text';
import { nullable } from '../../utils';

import classes from './Badge.module.css';

type TextPropsKeys = Exclude<keyof React.ComponentProps<typeof Text>, 'as' | 'weight' | 'size'>;

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
    s: classes.BadgeSizeS,
    m: classes.BadgeSizeM,
    l: classes.BadgeSizeL,
    xl: classes.BadgeSizeXl,
};

export const Badge: React.FC<BadgeProps> = ({
    iconLeft,
    iconRight,
    text,
    className,
    view = 'default',
    size = 's',
    ...rest
}) => {
    return (
        <Text
            className={cn(
                classes.Badge,
                className,
                {
                    [classes.BadgeOutlined]: view === 'outline',
                },
                sizeMap[size],
            )}
            as="span"
            weight="bold"
            size={size}
            {...rest}
        >
            {nullable(iconLeft, (icon) => (
                <span className={classes.BadgeIconLeft}>{icon}</span>
            ))}
            {nullable(text, (t) => t)}
            {nullable(iconRight, (icon) => (
                <span className={classes.BadgeIconRight}>{icon}</span>
            ))}
        </Text>
    );
};
