import React, { FC, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { gray4, gray7, radiusM } from '@taskany/colors';

import { nullable } from '../utils';

export const collapseOffset = 20;

const dotSize = 8;

const line = css`
    position: absolute;
    width: 1px;
    top: 0;
    bottom: 0;
    left: ${collapseOffset / 2}px;
    background: ${gray7};
    z-index: 1;
`;

const StyledDot = styled.div`
    display: none;
    position: absolute;
    top: 50%;
    width: ${dotSize}px;
    height: ${dotSize}px;
    margin-top: -${dotSize / 2}px;
    left: ${collapseOffset / 2 - dotSize / 2}px;

    border-radius: 100%;
    background: ${gray7};
`;

const StyledParentDot = styled(StyledDot)``;

const StyledCollapsableHeader = styled.div`
    padding-bottom: 1px;
`;

const StyledCollapsableItem = styled.div`
    position: relative;

    &:before {
        content: '';
        ${line}
        margin-left: -${collapseOffset}px;
    }
`;

const StyledHeaderContent = styled.div<{ highlighted?: boolean }>`
    border-radius: ${radiusM};

    ${({ highlighted }) =>
        highlighted &&
        `
        background: ${gray4};
    `}
`;

const StyledCollapsableContainer = styled.div<{ collapsed: boolean; depth: number }>`
    position: relative;

    border-radius: ${radiusM};

    > ${StyledCollapsableItem}:before {
        display: none;
    }

    &:last-child:before {
        display: none;
    }

    &:last-child > ${StyledCollapsableHeader}:after {
        content: '';
        ${line}

        bottom: 50%;

        ${({ depth }) => depth === 0 && 'display: none;'}
    }

    ${({ depth }) =>
        depth > 0 &&
        `
        margin-left: -${collapseOffset}px;
        padding-left: ${collapseOffset}px;
    `}

    ${({ collapsed, depth }) =>
        !collapsed &&
        css`
            padding-left: ${collapseOffset}px;
            margin-left: ${depth === 0 ? -collapseOffset : 0}px;

            /** show dot and add paddings for earch item is opened */

            & > & > ${StyledCollapsableHeader}, & > ${StyledCollapsableHeader} {
                padding-left: ${collapseOffset}px;
                margin-left: -${collapseOffset}px;
                position: relative;

                /** display dot */

                > ${StyledDot} {
                    display: block;
                }
            }

            /** add parent dot if not first lvl */

            & > ${StyledCollapsableHeader} > ${StyledParentDot} {
                ${depth > 0 &&
                css`
                    display: block;
                    margin-left: -${collapseOffset}px;
                `}
            }

            /** first item vertical line */

            & > &:before,
            & > ${StyledCollapsableHeader}:before {
                content: '';
                ${line}
            }

            /** first item vertical line */

            & > ${StyledCollapsableHeader}:before {
                top: 50%;
            }

            /** last item vertical line */

            & > &:last-of-type:before {
                bottom: 50%;
            }

            &:before {
                margin-left: -${collapseOffset}px;
            }

            &:last-child > ${StyledCollapsableHeader}:after {
                margin-left: -${collapseOffset}px;
            }

            > ${StyledCollapsableItem}:before {
                display: block;
            }
        `}
`;

export const CollapsableItem: FC<{
    children?: ReactNode;
    onClick?: () => void;
    header: ReactNode;
    content: ReactNode;
    depth?: number;
    collapsed: boolean;
}> = ({ onClick, children, header, collapsed, depth = 0, content }) => (
    <StyledCollapsableContainer collapsed={collapsed} depth={depth}>
        <StyledCollapsableHeader onClick={onClick}>
            <StyledParentDot />
            <StyledDot />
            <StyledHeaderContent highlighted={!!onClick && collapsed}>{header}</StyledHeaderContent>
        </StyledCollapsableHeader>
        {nullable(children, (ch) => (
            <StyledCollapsableItem>{ch}</StyledCollapsableItem>
        ))}
        {!collapsed ? content : null}
    </StyledCollapsableContainer>
);
