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
    hasNestedCollapsableItems?: boolean;
    isOpen: boolean;
    hasContent: boolean;
}>`
    ${({ isOpen, hasNestedCollapsableItems, isRoot, hasContent }) =>
        !isRoot &&
        hasContent &&
        css`
            &::before {
                content: '';
                ${dot};

                position: absolute;
                top: 16px;
                left: ${hasNestedCollapsableItems && isOpen
                    ? `calc(-${doubleDotSize}px - ${collapseOffset}px)`
                    : `calc(-${doubleDotSize}px)`};
                z-index: 1;
            }
        `};
`;

const StyledHeaderContent = styled.div<{ highlighted: boolean; hasNestedCollapsableItems?: boolean; isOpen: boolean }>`
    position: relative;

    border-radius: ${radiusM};
    ${({ highlighted }) =>
        highlighted &&
        `
        background: ${gray4};
    `}

    ${({ hasNestedCollapsableItems, isOpen }) =>
        hasNestedCollapsableItems &&
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
    hasNestedCollapsableItems?: boolean;
    isOpen: boolean;
    hasContent: boolean;
    isRoot?: boolean;
}>`
    position: relative;

    ${({ isRoot, isOpen, hasNestedCollapsableItems }) =>
        !isRoot &&
        isOpen &&
        hasNestedCollapsableItems && {
            marginLeft: `${collapseOffset}px`,
        }};

    ${({ hasNestedCollapsableItems }) =>
        hasNestedCollapsableItems &&
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

    ${({ hasNestedCollapsableItems, isOpen, isRoot, hasContent }) =>
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
                          (isOpen && hasNestedCollapsableItems ? 1 : 0) * collapseOffset
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
    hasNestedCollapsableItems?: boolean;
    onClick?: () => void;
}> = ({ children, header, isOpen, isRoot, hasNestedCollapsableItems, onClick }) => {
    const hasContent = Boolean(children);

    return (
        <StyledCollapsableContainer
            isOpen={isOpen}
            hasNestedCollapsableItems={hasNestedCollapsableItems}
            isRoot={isRoot}
            hasContent={hasContent}
        >
            <StyledCollapsableHeader
                isOpen={isOpen}
                hasNestedCollapsableItems={hasNestedCollapsableItems}
                isRoot={isRoot}
                hasContent={hasContent}
                onClick={onClick}
            >
                <StyledHeaderContent
                    isOpen={isOpen}
                    hasNestedCollapsableItems={hasNestedCollapsableItems}
                    highlighted={!!onClick && !isOpen}
                >
                    {header}
                </StyledHeaderContent>
            </StyledCollapsableHeader>

            {isOpen && children}
        </StyledCollapsableContainer>
    );
};
