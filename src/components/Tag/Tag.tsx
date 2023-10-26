import React from 'react';
import styled from 'styled-components';
import { gray5, gray6, gray8, gray9, radiusL } from '@taskany/colors';
import { IconXCircleSolid } from '@taskany/icons';

interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    size?: 's' | 'm';
    className?: string;
}

// FIXME: clicking on this element triggers click on Tag.
// Must be solved in base icon component.
export const TagCleanButton = styled(IconXCircleSolid).attrs({
    size: 'xs',
})`
    visibility: hidden;

    position: absolute;
    top: -4px;
    right: -4px;

    color: ${gray8};

    transition: color 100ms ease-in-out;

    &:hover {
        color: ${gray9};
    }
`;

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

    transition: background-color 100ms ease-in-out;

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

            &:hover {
                background-color: ${gray6};
            }
        `}

    ${({ size }) =>
        size === 's' &&
        `
            padding: 3px 10px;
            font-size: 11px;
        `}
`;

export const Tag: React.FC<TagProps> = ({ children, size = 'm', ...props }) => {
    return (
        <StyledTag size={size} {...props}>
            {children}
        </StyledTag>
    );
};
