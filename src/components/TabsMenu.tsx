import styled from 'styled-components';
import { gapM, gapS, gapXs, gray4, gray7, radiusS, radiusXl, textColor } from '@taskany/colors';

export const TabsMenu = styled.div`
    padding: ${gapM} 0 0;

    margin-left: -6px; // radius compensation
`;

export const TabsMenuDefault = styled.div<{ active?: boolean }>`
    display: inline-block;
    color: ${gray7};
    border-radius: ${radiusS};
    padding: ${gapXs} ${gapS};

    cursor: pointer;

    ${({ active }) =>
        active &&
        `
            cursor: default;
            color: ${textColor};
            background-color: ${gray4};
            pointer-events: none;
        `}
`;

export const TabsMenuItem = styled(TabsMenuDefault)`
    border-radius: ${radiusXl};
    padding: ${gapS} ${gapM};

    &:first-child {
        padding-left: 6px;
    }

    ${({ active }) =>
        active &&
        `
            padding: ${gapS} ${gapM};

            font-weight: 600;

            &:first-child {
                padding: ${gapS} ${gapM};
            }
        `}
`;
