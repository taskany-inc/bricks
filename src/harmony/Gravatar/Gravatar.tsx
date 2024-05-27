import React, { ComponentProps, FC, useEffect, useState } from 'react';
import md5Hash from 'md5';
import cn from 'classnames';

import { isRetina } from '../../utils/isRetina';
import { preloadImage } from '../../utils/preloadImage';
import { getInitials } from '../../utils/getInitials';
import { Circle } from '../Circle/Circle';

import s from './Gravatar.module.css';

const pixelSizeMap = {
    xs: 16,
    s: 24,
    m: 32,
} as const;

interface GravatarProps extends React.HTMLAttributes<HTMLImageElement> {
    email?: string | null;
    md5?: string;
    size: ComponentProps<typeof Circle>['size'];
    rating?: string;
    def?: string;
    domain?: string;
    name?: string | null;
}

export const Gravatar: FC<GravatarProps> = ({
    size = 's',
    rating = 'g',
    def = 'retro',
    domain = 'www.gravatar.com',
    email,
    md5,
    name,
    className,
    ...props
}) => {
    const [isError, setIsError] = useState(false);
    const [isLoad, setIsLoad] = useState(false);

    const pixelSize = pixelSizeMap[size];

    const query = new URLSearchParams({
        s: String(pixelSize),
        r: rating,
        d: def,
    });

    const retinaQuery = new URLSearchParams({
        s: String(pixelSize * 2),
        r: rating,
        d: def,
    });

    const formattedEmail = email?.trim().toLowerCase() || '';

    let hash;
    if (md5) {
        hash = md5;
    } else if (typeof email === 'string') {
        hash = md5Hash(formattedEmail, { encoding: 'binary' });
    } else {
        // eslint-disable-next-line no-console
        console.warn('Gravatar image can not be fetched. Either the "email" or "md5" prop must be specified.');
        return <script />;
    }

    const base = `//${domain}/avatar/`;
    const src = `${base}${hash}?${query}`;
    const retinaSrc = `${base}${hash}?${retinaQuery}`;
    const img = isRetina() ? retinaSrc : src;

    useEffect(() => {
        setIsLoad(false);
        setIsError(false);
        preloadImage(img)
            .then(() => setIsLoad(true))
            .catch(() => setIsError(true));
    }, [hash]);

    return !isLoad || isError ? (
        <Circle size={size} string={`${email}`} {...props}>
            {getInitials(name)}
        </Circle>
    ) : (
        <img className={cn(s.GravatarImage, className)} src={img} height={pixelSize} width={size} {...props} />
    );
};
