import React, { FC, useState } from 'react';
import md5Hash from 'md5';
import styled from 'styled-components';

import { isRetina } from '../utils/isRetina';
import { preloadImage } from '../utils/preloadImage';
import { getInitials } from '../utils/getInitials';

import { Circle } from './Circle';

interface GravatarProps extends React.HTMLAttributes<HTMLImageElement> {
    email?: string | null;
    md5?: string;
    size: number;
    rating?: string;
    def?: string;
    className?: string;
    domain?: string;
    name?: string | null;

    onClick?: () => void;
}

const StyledImage = styled.img`
    border: 0;
    border-radius: 100%;
`;

export const Gravatar: FC<GravatarProps> = ({
    size = 50,
    rating = 'g',
    def = 'retro',
    domain = process.env.NEXT_PUBLIC_GRAVATAR_HOST || 'www.gravatar.com',
    email,
    md5,
    name,
    ...props
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

    preloadImage(img)
        .then(() => setIsLoad?.(true))
        .catch(() => setIsError?.(true));

    return !isLoad || isError ? (
        <Circle size={size} str={`${email}`} {...props}>
            {getInitials(name)}
        </Circle>
    ) : (
        <StyledImage src={img} height={size} width={size} {...props} />
    );
};
