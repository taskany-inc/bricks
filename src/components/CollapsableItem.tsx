import React, { FC, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { backgroundColor, gray4, gray7, radiusM } from '@taskany/colors';

export const collapseOffset = 20;

const dotSize = 8;
const halfDotSize = dotSize / 2;
const doubleDotSize = dotSize * 2;

const dot = css`
    width: ${dotSize}px;
    height: ${dotSize}px;
    border-radius: ${radiusM};
    background: ${gray7};
`;

const StyledCollapsableHeader = styled.div<{
    isRoot?: boolean;
    hasChild?: boolean;
    isOpen: boolean;
    hasContent: boolean;
}>`
    ${({ isOpen, hasChild, isRoot, hasContent }) =>
        !isRoot &&
        hasContent &&
        css`
            &::before {
                content: '';
                ${dot};

                position: absolute;
                top: 16px;
                left: ${hasChild && isOpen
                    ? `calc(-${doubleDotSize}px - ${collapseOffset}px)`
                    : `calc(-${doubleDotSize}px)`};
                z-index: 1;
            }
        `};
`;

const StyledHeaderContent = styled.div<{ highlighted: boolean; hasChild?: boolean; isOpen: boolean }>`
    position: relative;

    border-radius: ${radiusM};
    ${({ highlighted }) =>
        highlighted &&
        `
        background: ${gray4};
    `}

    ${({ hasChild, isOpen }) =>
        hasChild &&
        isOpen &&
        css`
            &::after {
                content: '';
                ${dot};

                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                left: calc(-2 * ${dotSize}px);
            }
        `};
`;

const StyledCollapsableContainer = styled.div<{
    hasChild?: boolean;
    isOpen: boolean;
    hasContent: boolean;
    isRoot?: boolean;
}>`
    position: relative;

    ${({ isRoot, isOpen, hasChild }) =>
        !isRoot &&
        isOpen &&
        hasChild && {
            marginLeft: `${collapseOffset}px`,
        }};

    ${({ hasChild }) =>
        hasChild &&
        css`
            &::before {
                content: '';
                position: absolute;
                width: 1px;
                height: calc(100% - ${doubleDotSize}px - ${doubleDotSize}px - ${dotSize}px - 2px);
                background-color: ${gray7};
                left: calc(-${doubleDotSize}px + ${halfDotSize}px);
                top: calc(${doubleDotSize}px + ${halfDotSize}px);
            }
        `};

    ${({ hasChild, isOpen, isRoot, hasContent }) =>
        !isRoot && hasContent
            ? css`
                  &:last-child::after {
                      content: '';
                      position: absolute;

                      width: 1px;
                      height: 100%;
                      background: ${backgroundColor};

                      top: ${doubleDotSize}px;
                      left: ${`calc(-${halfDotSize}px - ${dotSize}px - ${
                          (isOpen && hasChild ? 1 : 0) * collapseOffset
                      }px)`};
                  }
              `
            : !isRoot &&
              css`
                  &:last-child::after {
                      content: '';
                      position: absolute;
                      ${dot};

                      top: ${doubleDotSize}px;
                      left: calc(-2 * ${dotSize}px);
                  }
              `};
`;

export const CollapsableContentItem: FC<{
    children?: ReactNode;
    className?: string;
}> = ({ children, className }) => <div className={className}>{children}</div>;

export const CollapsableItem: FC<{
    children?: ReactNode;
    header: ReactNode;
    isRoot?: boolean;
    isOpen: boolean;
    hasChild?: boolean;
    onClick?: () => void;
}> = ({ children, header, isOpen, isRoot, hasChild, onClick }) => {
    const hasContent = Boolean(children);

    return (
        <StyledCollapsableContainer isOpen={isOpen} hasChild={hasChild} isRoot={isRoot} hasContent={hasContent}>
            <StyledCollapsableHeader
                isOpen={isOpen}
                hasChild={hasChild}
                isRoot={isRoot}
                hasContent={hasContent}
                onClick={onClick}
            >
                <StyledHeaderContent isOpen={isOpen} hasChild={hasChild} highlighted={!!onClick && !isOpen}>
                    {header}
                </StyledHeaderContent>
            </StyledCollapsableHeader>

            {isOpen && children}
        </StyledCollapsableContainer>
    );
};
