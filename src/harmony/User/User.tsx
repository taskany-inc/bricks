import React, { forwardRef, useState } from 'react';
import cn from 'classnames';

import { Circle } from '../Circle/Circle';
import { preloadImage } from '../../utils/preloadImage';
import { nullable } from '../../utils';
import { getInitials } from '../../utils/getInitials';

import classes from './User.module.css';

interface UserProps {
    name?: string | null;
    email?: string | null;
    src?: string | null;
    short?: boolean;
    inheritColor?: boolean;
    className?: string;
}

type AvatarLoadState = 'success' | 'error' | 'loading';

export const User = forwardRef<HTMLDivElement, UserProps>(
    ({ email, name, src, short, inheritColor, className }, ref) => {
        const [status, setStatus] = useState<AvatarLoadState>('loading');

        if (src) {
            preloadImage(src)
                .then(() => setStatus('success'))
                .catch(() => setStatus('error'));
        }

        return (
            <div className={cn(classes.User, className)} ref={ref}>
                <Circle string={`${email}`} className={cn(classes.UserPicWrapper)}>
                    {nullable(
                        status === 'success',
                        () => (
                            <img src={src} alt={name || email} className={classes.UserImage} />
                        ),
                        getInitials(name),
                    )}
                </Circle>
                {nullable(!short, () => (
                    <span
                        className={cn(classes.UserName, {
                            [classes.UserNameColorInherit]: inheritColor,
                        })}
                    >
                        {name || email}
                    </span>
                ))}
            </div>
        );
    },
);
