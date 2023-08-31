import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { IconLoaderOutline, BaseIconProps } from '@taskany/icons';

const rotate = keyframes`
    100% {
        transform: rotate(359deg);
    }
`;

const StyledSpinner = styled.div<{ animationDuration: number }>`
    animation: ${({ animationDuration }) =>
        css`
            ${rotate} ${animationDuration}s linear infinite
        `};
`;

export interface SpinnerProps extends BaseIconProps {
    animationDuration?: number; // in seconds
}

export const Spinner = ({ size = 'm', animationDuration = 2, ...props }: SpinnerProps) => {
    return (
        <StyledSpinner animationDuration={animationDuration}>
            <IconLoaderOutline size={size} {...props} />
        </StyledSpinner>
    );
};
