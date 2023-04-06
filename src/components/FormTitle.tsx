import styled from 'styled-components';
import { gapM, gapS } from '@taskany/colors';

import { Text, TextProps } from './Text';

export const FormTitle = styled(Text)<TextProps>`
    padding: ${gapS} 0 ${gapM};
`;

FormTitle.defaultProps = {
    size: 'xl',
    weight: 'bolder',
};

export default FormTitle;
