import React, { FC, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import md5Hash from 'md5';
import styled from 'styled-components';

import { isRetina } from '../utils/isRetina';
import { isColorDark, stringToColor } from '../utils/stringToColor';

interface GravatarProps extends React.HTMLAttributes<HTMLImageElement> {
    email?: string | null;
    md5?: string;
    size: number;
    rating?: string;
    name?: string | null;
    def?: string;
    className?: string;
    domain?: string;

    onClick?: () => void;
}

const StyledImage = styled.img`
    border: 0;
    border-radius: 100%;
`;

const Circle = styled.div<{ size: number; str: string }>`
    border-radius: 100%;

    ${({ size, str }) => {
        const mainColor = stringToColor(str);
        return {
            width: `${size}px`,
            height: `${size}px`,
            background: `linear-gradient(90deg,${mainColor},${stringToColor(str.toUpperCase())})`,
            color: `${isColorDark(mainColor) ? 'white' : 'black'}`,
            fontSize: `calc(${size / 2}px - 2px)`,
        };
    }};

    display: flex;
    align-items: center;
    justify-content: center;

    letter-spacing: -1.5px;
    font-weight: 600;
    user-select: none;
`;

const getInitials = (fullName?: string | null) => {
    if (!fullName) return '';
    const arr = fullName.split(' ');
    return `${arr[0]?.[0] || ''} ${arr[1]?.[0] || ''}`;
};

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
    const [modernBrowser, setModernBrowser] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [isError, setIsError] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    useLayoutEffect(() => {
        setModernBrowser('srcset' in document.createElement('img'));
        setMounted(true);
    }, []);

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

    const onLoadError: React.ReactEventHandler<HTMLImageElement> = useCallback(({ currentTarget }) => {
        currentTarget.onerror = null;
        setIsError(true);
    }, []);

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
            imgRef.current.src = modernBrowser && isRetina() ? retinaSrc : src;
        }
    }, [imgRef, mounted, modernBrowser, src, retinaSrc]);

    const initials = getInitials(name);

    return (
        <>
            {!isError ? (
                <StyledImage ref={imgRef} height={size} width={size} onError={onLoadError} {...props} />
            ) : (
                <Circle size={size} str={formattedEmail} {...props}>
                    {initials}
                </Circle>
            )}
        </>
    );
};
