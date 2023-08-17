import React, { FC, useCallback, useEffect, useRef } from 'react';
import md5Hash from 'md5';
import styled from 'styled-components';

import { isRetina } from '../utils/isRetina';
import { useMounted } from '../hooks';

interface GravatarProps extends React.HTMLAttributes<HTMLImageElement> {
    email?: string | null;
    md5?: string;
    size: number;
    rating?: string;
    def?: string;
    className?: string;
    domain?: string;

    onLoadError?: () => void;
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
    onLoadError,
    ...props
}) => {
    const mounted = useMounted();
    const imgRef = useRef<HTMLImageElement>(null);

    const base = `//${domain}/avatar/`;

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

    const onError: React.ReactEventHandler<HTMLImageElement> = useCallback(
        ({ currentTarget }) => {
            currentTarget.onerror = null;
            onLoadError?.();
        },
        [onLoadError],
    );

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

    const src = `${base}${hash}?${query}`;
    const retinaSrc = `${base}${hash}?${retinaQuery}`;

    useEffect(() => {
        if (imgRef.current && mounted) {
            imgRef.current.src = isRetina() ? retinaSrc : src;
        }
    }, [imgRef, mounted, src, retinaSrc]);

    return <StyledImage ref={imgRef} height={size} width={size} onError={onError} {...props} />;
};
