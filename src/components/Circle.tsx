import styled from 'styled-components';

import { stringToColor, isColorDark } from '../utils/stringToColor';

export const Circle = styled.div<{ size: number; str: string }>`
    border-radius: 100%;

    ${({ size, str }) => {
        const mainColor = stringToColor(str);
        return {
            width: `${size}px`,
            height: `${size}px`,
            background: `linear-gradient(90deg,${mainColor},${stringToColor(str.toUpperCase())})`,
            color: `${isColorDark(mainColor) ? 'white' : 'black'}`,
            fontSize: `calc(${size / 2}px - 2px)`,
        };
    }};

    display: flex;
    align-items: center;
    justify-content: center;

    letter-spacing: -1.5px;
    font-weight: 600;
    user-select: none;
`;
