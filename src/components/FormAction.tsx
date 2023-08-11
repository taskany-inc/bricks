import styled from 'styled-components';

export const FormAction = styled.div<{ left?: boolean; right?: boolean; columns?: number; inline?: boolean }>`
    box-sizing: border-box;
    display: flex;
    align-items: center;

    ${({ left }) =>
        left &&
        `
            justify-self: start;
            text-align: left;
        `}

    ${({ right }) =>
        right &&
        `
            justify-self: end;
            text-align: right;
        `}

    ${({ columns }) =>
        columns &&
        `
            display: grid;
            align-items: center;
            grid-template-columns: repeat(${columns}, 1fr);
        `}

    ${({ inline }) =>
        inline &&
        `
            & > * {
                display: inline-block;
            }

            & > * + * {
                margin-left: 6px;
            }
        `}
`;
