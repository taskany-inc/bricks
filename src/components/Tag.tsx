import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';
import { colorPrimary, gapXs, gray10, gray5, gray6, gray9, radiusL, textColorPrimary } from '@taskany/colors';

import { CleanButton } from './CleanButton';

interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    description?: string;
    size?: 's' | 'm';
    className?: string;
    checked?: boolean;

    onClick?: MouseEventHandler<HTMLDivElement>;
}

export const TagCleanButton = styled(CleanButton)``;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledTag = styled(({ size, ...props }: TagProps) => <div {...props} />)`
    display: inline-block;
    position: relative;
    padding: 4px 12px 5px;

    border-radius: ${radiusL};

    font-size: 12px;
    line-height: 12px;
    font-weight: 500;
    color: ${gray9};
    user-select: none;

    cursor: default;

    background-color: ${gray5};

    transition: background-color, color 300ms ease-in-out;

    & + & {
        margin-left: ${gapXs};
    }

    ${({ checked }) =>
        !checked &&
        `
            &:hover {
                color: ${gray10};

                background-color: ${gray6};
            }
        `}

    &:hover {
        ${TagCleanButton} {
            visibility: visible;

            cursor: pointer;
        }
    }

    ${({ onClick }) =>
        onClick &&
        `
            cursor: pointer;
        `}

    ${({ size }) =>
        size === 's' &&
        `
            padding: 3px 10px;
            font-size: 11px;
        `}

    ${({ checked }) =>
        checked &&
        `
            color: ${textColorPrimary};

            background-color: ${colorPrimary};
        `}
`;

export const Tag: React.FC<TagProps> = ({ children, description, size = 'm', ...props }) => {
    return (
        <StyledTag size={size} title={description} {...props}>
            {children}
        </StyledTag>
    );
};
