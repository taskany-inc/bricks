import React from 'react';
import styled from 'styled-components';
import { gapM, gapS, gray5, gray6, gray9, radiusXl, textColor } from '@taskany/colors';

import { Text } from './Text';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const FiltersPanelContainer = styled(({ loading, ...props }) => <div {...props} />)<{ loading?: boolean }>`
    margin: ${gapM} 0;
    padding: ${gapS} 0;

    background-color: ${gray5};

    animation-name: bkgChange;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;

    transition: background-color 200ms ease-in-out;

    @keyframes bkgChange {
        0% {
            background-color: ${gray5};
        }
        50.0% {
            background-color: ${gray6};
        }
        100.0% {
            background-color: ${gray5};
        }
    }

    ${({ loading }) =>
        loading &&
        `
            animation-play-state: running;
            animation-duration: 1s;
    `}
`;

export const FiltersPanelContent = styled.div`
    padding: 0 40px;
    padding-top: 0;
    align-items: center;

    display: flex;
`;

export const FiltersSearchContainer = styled.div`
    width: 16.67%;
`;

export const FiltersCounterContainer = styled.div`
    padding-left: ${gapS};
`;

export const FiltersMenuContainer = styled.div`
    flex: 1;

    padding-left: ${gapM};
`;

export const FiltersAction = styled.div`
    display: inline-block;
    padding-left: ${gapS};
    padding-right: ${gapS};
    vertical-align: middle;

    cursor: pointer;

    color: ${gray9};

    :hover {
        color: ${textColor};
    }

    transition: color 200ms ease-in-out;
`;

export const FiltersApplied = styled(Text)`
    display: block;

    margin-top: -10px;
    padding: 0 40px ${gapM} 45px;
`;

export const FiltersMenuItem = styled.span<{
    active?: boolean;
    disabled?: boolean;
}>`
    display: inline-block;
    padding: ${gapS};

    cursor: pointer;

    user-select: none;

    border-radius: ${radiusXl};

    font-weight: 600;

    color: ${gray9};

    transition: 0.2s cubic-bezier(0.3, 0, 0.5, 1);
    transition-property: color;

    ${({ active }) =>
        active &&
        `
            color: ${textColor};
        `}

    &:hover {
        color: ${textColor};
    }
`;
