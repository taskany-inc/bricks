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

    position: relative;
`;

const StyledLoaderIcon = styled(IconLoaderOutline)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
`;

export interface SpinnerProps extends Omit<BaseIconProps, 'value'> {
    animationDuration?: number; // in seconds
}

export const Spinner = ({ size = 'm', animationDuration = 2, ...props }: SpinnerProps) => {
    return (
        <StyledSpinner animationDuration={animationDuration}>
            <StyledLoaderIcon size={size} {...props} />
        </StyledSpinner>
    );
};
