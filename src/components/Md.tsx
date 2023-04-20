import styled from 'styled-components';
import { link10, radiusS } from '@taskany/colors';

export const Md = styled.div`
    a {
        color: inherit;
        text-decoration: underline;

        transition: 0.2s cubic-bezier(0.3, 0, 0.5, 1);
        transition-property: color;
        transition-duration: 0.1s;

        cursor: pointer;

        &:hover {
            color: ${link10};
        }
    }

    img {
        max-width: 100%;
        border-radius: ${radiusS};
    }
`;

export default Md;
