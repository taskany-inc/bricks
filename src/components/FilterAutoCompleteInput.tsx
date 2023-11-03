import React from 'react';
import styled from 'styled-components';
import { IconSearchOutline } from '@taskany/icons';
import { gapS } from '@taskany/colors';

import { AutoCompleteInput } from './AutoComplete/AutoComplete';

const StyledInputWrapper = styled.div`
    margin-bottom: ${gapS};
`;

interface FilterAutoCompleteInputProps extends React.ComponentProps<typeof AutoCompleteInput> {
    placeholder?: string;
    iconLeft?: never;
}

export const FilterAutoCompleteInput: React.FC<FilterAutoCompleteInputProps> = ({ placeholder, ...props }) => {
    return (
        <StyledInputWrapper>
            <AutoCompleteInput placeholder={placeholder} iconLeft={<IconSearchOutline size="s" />} {...props} />
        </StyledInputWrapper>
    );
};
