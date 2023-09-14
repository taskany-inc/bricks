import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import styled, { css } from 'styled-components';

import { FormInput } from './FormInput';

const meta: Meta<typeof FormInput> = {
    title: 'FormInput',
    component: FormInput,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};

const StyledFormInput = styled(FormInput)<{ size: number }>`
    ${({ size }) => css`
        font-size: ${size}px;

        & input {
            font-size: ${size}px;
        }
    `}
`;

export const WithError: Story = {
    args: {
        error: {
            message: 'Error Message',
        },
    },
    render: (props) => (
        <>
            <StyledFormInput {...props} size={14} value="font size 14px" />
            <br />
            <StyledFormInput {...props} size={32} value="font size 32px" />
        </>
    ),
};
