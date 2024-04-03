import React, { ComponentProps, forwardRef, useState } from 'react';
import cn from 'classnames';

import { Circle } from '../Circle/Circle';
import { preloadImage } from '../../utils/preloadImage';
import { nullable } from '../../utils';
import { getInitials } from '../../utils/getInitials';
import { Gravatar } from '../../components';
import { Badge } from '../Badge/Badge';

import classes from './User.module.css';

const sizeMap = {
    s: 24,
    m: 32,
} as const;

interface UserProps {
    name?: string | null;
    email?: string | null;
    src?: string | null;
    size?: keyof typeof sizeMap;
    short?: boolean;
    inheritColor?: boolean;
    className?: string;
    iconRight?: ComponentProps<typeof Badge>['iconRight'];
    action?: ComponentProps<typeof Badge>['action'];
}

type AvatarLoadState = 'success' | 'error' | 'loading';

export const Avatar: React.FC<
    Pick<UserProps, 'name' | 'email' | 'src' | 'size'> & Omit<ComponentProps<typeof Circle>, 'string'>
> = ({ src, email, name, size = 's', className, ...rest }) => {
    const [status, setStatus] = useState<AvatarLoadState>('loading');

    if (!src || status === 'error') {
        return <Gravatar className={className} name={name} email={email} size={sizeMap[size]} {...rest} />;
    }

    preloadImage(src)
        .then(() => setStatus('success'))
        .catch(() => setStatus('error'));

    return (
        <Circle string={`${email}`} className={cn(classes.UserPicWrapper, className)} size={size} {...rest}>
            {nullable(
                status === 'success',
                () => (
                    <img src={src} alt={(name || email) as string} className={classes.UserImage} />
                ),
                getInitials(name),
            )}
        </Circle>
    );
};

export const User = forwardRef<HTMLDivElement, UserProps>(
    ({ email, name, src, short, inheritColor, size = 's', className, iconRight, action }, ref) => {
        return (
            <Badge
                className={cn(
                    classes.User,
                    {
                        [classes.UserSizeS]: size === 's',
                        [classes.UserSizeM]: size === 'm',
                        [classes.User_short]: short,
                    },
                    className,
                )}
                ref={ref}
                iconLeft={<Avatar src={src} name={name} email={email} size={size} />}
                text={nullable(!short, () => (
                    <span
                        className={cn(classes.UserName, {
                            [classes.UserNameColorInherit]: inheritColor,
                        })}
                    >
                        {name || email}
                    </span>
                ))}
                iconRight={iconRight}
                action={action}
            />
        );
    },
);
