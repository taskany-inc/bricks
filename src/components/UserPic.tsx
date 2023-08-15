import React, { useCallback } from 'react';
import styled from 'styled-components';

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

export const UserPic: React.FC<UserPicProps> = ({ src, email, size = 32, ...props }) => {
    const sizePx = `${size}px`;

    const onLoadError: React.ReactEventHandler<HTMLImageElement> = useCallback(({ currentTarget }) => {
        currentTarget.onerror = null;
    }, []);

    if (src) {
        return <StyledImage src={src} height={sizePx} width={sizePx} onError={onLoadError} {...props} />;
    }

    return <Gravatar email={email} size={size} {...props} />;
};
