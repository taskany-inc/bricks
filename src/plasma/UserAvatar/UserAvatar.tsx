import { Avatar } from '@salutejs/plasma-web';
import React, { useEffect, useState } from 'react';
import md5Hash from 'md5';

import { preloadImage } from '../../utils/preloadImage';
import { getInitials } from '../../utils/getInitials';
import { isRetina } from '../../utils/isRetina';
import { Circle } from '../../components/Circle';

interface UserAvatarProps {
    size: number;
    email?: string | null;
    md5?: string;
    rating?: string;
    def?: string;
    domain?: string;
    name?: string | null;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
    size = 120,
    rating = 'g',
    def = 'retro',
    domain = process.env.NEXT_PUBLIC_GRAVATAR_HOST || 'www.gravatar.com',
    email,
    md5,
    name,
}) => {
    const [isError, setIsError] = useState(false);
    const [isLoad, setIsLoad] = useState(false);

    const query = new URLSearchParams({
        s: String(size),
        r: rating,
        d: def,
    });

    const retinaQuery = new URLSearchParams({
        s: String(size * 2),
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
        width: `${size}px`,
        height: `${size}px`,
    };

    return !isLoad || isError ? (
        <Circle size={size} str={`${email}`}>
            {getInitials(name)}
        </Circle>
    ) : (
        <div style={containerStyle}>
            <Avatar url={img} size="fit" />
        </div>
    );
};
