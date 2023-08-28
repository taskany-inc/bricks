import React, { useState } from 'react';
import styled from 'styled-components';

import { preloadImage } from '../utils/preloadImage';
import { getInitials } from '../utils/getInitials';

import { Gravatar } from './Gravatar';
import { Circle } from './Circle';

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

export const UserPic: React.FC<UserPicProps> = ({ src, name, email, size = 32, ...props }) => {
    const [isError, setIsError] = useState(false);
    const [isLoad, setIsLoad] = useState(false);

    if (src) {
        preloadImage(src)
            .then(() => setIsLoad(true))
            .catch(() => setIsError(true));

        return !isLoad || isError ? (
            <Circle size={size} str={`${email}`} {...props}>
                {getInitials(name)}
            </Circle>
        ) : (
            <StyledImage src={src} height={size} width={size} {...props} />
        );
    }

    return <Gravatar name={name} email={email} size={size} {...props} />;
};
