import styled from 'styled-components';
import { gray4, radiusM } from '@taskany/colors';

export const Card = styled.div`
    position: relative;
    box-sizing: border-box;
    min-height: auto;

    border: 1px solid ${gray4};
    border-radius: ${radiusM};
`;
