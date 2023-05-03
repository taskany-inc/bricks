import React from 'react';
import styled from 'styled-components';
import { gapM, gapS, gray5, gray6, gray9, textColor } from '@taskany/colors';

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

export const FiltersMenuContainer = styled.div`
    flex: 1;

    padding-left: ${gapM};
`;

export const StyledFiltersAction = styled.div`
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
