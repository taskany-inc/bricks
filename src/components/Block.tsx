import React, { FC } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div<{ color: string }>`
    color: ${({ color }) => color};
    background: black;
`;

export const Block: FC<{
    text: string;
    color: string;
}> = ({ color, text }) => <Wrapper color={color}>{text}</Wrapper>;
