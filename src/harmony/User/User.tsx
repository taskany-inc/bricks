import React, { ComponentProps, forwardRef, useState } from 'react';
import cn from 'classnames';

import { Circle } from '../Circle/Circle';
import { preloadImage } from '../../utils/preloadImage';
import { nullable } from '../../utils';
import { getInitials } from '../../utils/getInitials';
import { Badge } from '../Badge/Badge';
import { Gravatar } from '../Gravatar/Gravatar';

import classes from './User.module.css';

type BannedBadgeProps = keyof Pick<ComponentProps<typeof Badge>, 'iconLeft' | 'text' | 'size' | 'lines'>;

interface UserProps extends Omit<ComponentProps<typeof Badge>, BannedBadgeProps> {
    name?: string | null;
    email?: string | null;
    src?: string | null;
    size?: ComponentProps<typeof Gravatar>['size'];
    short?: boolean;
    className?: string;
}

type AvatarLoadState = 'success' | 'error' | 'loading';

export const Avatar: React.FC<
    Pick<UserProps, 'name' | 'email' | 'src' | 'size'> & Omit<ComponentProps<typeof Circle>, 'string'>
> = ({ src, email, name, size = 's', className, ...rest }) => {
    const [status, setStatus] = useState<AvatarLoadState>('loading');

    if (!src || status === 'error') {
        return <Gravatar className={className} name={name} email={email} size={size} {...rest} />;
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
    ({ email, name, src, short, size = 's', as = 'div', className, ellipsis, ...props }, ref) => {
        return (
            <Badge
                className={cn(
                    classes.User,
                    {
                        [classes.UserSizeXs]: size === 'xs',
                        [classes.UserSizeS]: size === 's',
                        [classes.UserSizeM]: size === 'm',
                        [classes.User_short]: short,
                        [classes.UserOutlined]: props.view === 'outline',
                    },
                    className,
                )}
                ellipsis={ellipsis}
                lines={ellipsis ? 1 : undefined}
                as={as}
                ref={ref}
                iconLeft={<Avatar src={src} name={name} email={email} size={size} />}
                text={nullable(!short, () => (
                    <span className={classes.UserName}>{name || email}</span>
                ))}
                {...props}
            />
        );
    },
);
