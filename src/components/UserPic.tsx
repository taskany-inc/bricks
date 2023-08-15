import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import { stringToColor, isColorDark } from '../utils/stringToColor';

import { Gravatar } from './Gravatar';

interface UserPicProps extends React.HTMLAttributes<HTMLImageElement> {
    src?: string | null;
    size?: number;
    email?: string | null;
    name?: string | null;
    className?: string;

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

export const UserPic: React.FC<UserPicProps> = ({ src, name, email, size = 32, ...props }) => {
    const [isError, setIsError] = useState(false);
    const sizePx = `${size}px`;

    const onLoadError = useCallback(() => {
        setIsError(true);
    }, []);

    const onError: React.ReactEventHandler<HTMLImageElement> = useCallback(
        ({ currentTarget }) => {
            currentTarget.onerror = null;
            onLoadError();
        },
        [onLoadError],
    );

    if (isError) {
        return (
            <Circle size={size} str={`${email}`} {...props}>
                {getInitials(name)}
            </Circle>
        );
    }

    if (src) {
        return <StyledImage src={src} height={sizePx} width={sizePx} onError={onError} {...props} />;
    }

    return <Gravatar onLoadError={onLoadError} email={email} size={size} {...props} />;
};
