import { Avatar } from '@salutejs/plasma-web';
import React, { useEffect, useState } from 'react';
import md5Hash from 'md5';

import { preloadImage } from '../../utils/preloadImage';
import { getInitials } from '../../utils/getInitials';
import { isRetina } from '../../utils/isRetina';
import { Circle } from '../Circle/Circle';

interface UserAvatarProps {
    size?: 's' | 'm' | 'l' | 'xl' | 'xxl' | 'fit';
    email?: string | null;
    md5?: string;
    rating?: string;
    def?: string;
    shape?: 'circled' | 'rounded';
    domain?: string;
    name?: string | null;
}

const sizesMap = {
    s: 24,
    m: 36,
    l: 48,
    xl: 100,
    xxl: 120,
    fit: 120,
};

export const UserAvatar: React.FC<UserAvatarProps> = ({
    size = 'xxl',
    rating = 'g',
    def = 'retro',
    shape = 'rounded',
    domain = process.env.NEXT_PUBLIC_GRAVATAR_HOST || 'www.gravatar.com',
    email,
    md5,
    name,
}) => {
    const [isError, setIsError] = useState(false);
    const [isLoad, setIsLoad] = useState(false);

    const query = new URLSearchParams({
        s: String(sizesMap[size]),
        r: rating,
        d: def,
    });

    const retinaQuery = new URLSearchParams({
        s: String(sizesMap[size] * 2),
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

    const containerStyle = {
        width: `${sizesMap[size]}px`,
        height: `${sizesMap[size]}px`,
    };

    return !isLoad || isError ? (
        <Circle size={sizesMap[size]} string={`${email}`}>
            {getInitials(name)}
        </Circle>
    ) : (
        <div style={containerStyle}>
            <Avatar url={img} shape={shape} size={size} />
        </div>
    );
};
