import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';
import { IconExclamationCircleSolid } from '@taskany/icons';

import { FormControlError, FormControlLabel, FormControl, FormControlInput } from './FormControl';

type Props = React.ComponentProps<typeof FormControl> & { disabled?: boolean };

const meta: Meta<Props> = {
    title: 'FormControl',
    component: FormControl,
    argTypes: {
        size: {
            control: { type: 'inline-radio' },
        },
        variant: {
            control: { type: 'inline-radio' },
        },
        flat: {
            control: { type: 'inline-radio' },
        },
        brick: {
            control: { type: 'inline-radio' },
        },
        disabled: {
            type: 'boolean',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (props) => {
        return (
            <FormControl id="input-id" {...props}>
                <FormControlLabel>Label</FormControlLabel>
                <FormControlInput value="" name="field" placeholder="Placeholder" disabled={props.disabled}>
                    {props.error && <FormControlError error={{ message: 'Error message' }} />}
                </FormControlInput>
            </FormControl>
        );
    },
};

const StyledInput = styled(FormControlInput)`
    border: none;
    background-color: transparent;
    color: inherit;
    font-size: inherit;
`;

export const FlattenBrickGrid: Story = {
    argTypes: {
        variant: {
            disabled: true,
        },
        flat: {
            disabled: true,
        },
        brick: {
            disabled: true,
        },
        error: {
            disabled: true,
        },
    },
    render: (props) => (
        <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px' }}>
                <FormControl {...props} variant="blank" brick="right" flat="bottom">
                    <StyledInput value="Input value" disabled={props.disabled} />
                </FormControl>
                <FormControl {...props} variant="blank" brick="center">
                    <StyledInput value="Input value" disabled={props.disabled} />
                </FormControl>
                <FormControl {...props} variant="blank" brick="left" flat="bottom">
                    <StyledInput value="Input value" disabled={props.disabled} />
                </FormControl>
                <FormControl {...props} variant="blank" flat="both">
                    <StyledInput value="Input value" disabled={props.disabled} />
                </FormControl>
                <FormControl {...props} variant="blank" flat="both" error>
                    <StyledInput
                        value="Input value"
                        disabled={props.disabled}
                        iconLeft={<IconExclamationCircleSolid size="s" />}
                    />
                </FormControl>
                <FormControl {...props} variant="blank" flat="both">
                    <StyledInput value="Input value" disabled={props.disabled} />
                </FormControl>
                <FormControl {...props} variant="blank" brick="right" flat="top">
                    <StyledInput value="Input value" disabled={props.disabled} />
                </FormControl>
                <FormControl {...props} variant="blank" brick="center">
                    <StyledInput value="Input value" disabled={props.disabled} />
                </FormControl>
                <FormControl {...props} variant="blank" brick="left" flat="top">
                    <StyledInput value="Input value" disabled={props.disabled} />
                </FormControl>
            </div>
            <br />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px' }}>
                <FormControl {...props} variant="outline" brick="right" flat="bottom">
                    <StyledInput value="Input value" disabled={props.disabled} />
                </FormControl>
                <FormControl {...props} variant="outline" brick="center">
                    <StyledInput value="Input value" disabled={props.disabled} />
                </FormControl>
                <FormControl {...props} variant="outline" brick="left" flat="bottom">
                    <StyledInput value="Input value" disabled={props.disabled} />
                </FormControl>
                <FormControl {...props} variant="outline" flat="both">
                    <StyledInput value="Input value" disabled={props.disabled} />
                </FormControl>
                <FormControl {...props} variant="outline" flat="both" error>
                    <StyledInput
                        value="Input value"
                        disabled={props.disabled}
                        iconLeft={<IconExclamationCircleSolid size="s" />}
                    />
                </FormControl>
                <FormControl {...props} variant="outline" flat="both">
                    <StyledInput value="Input value" disabled={props.disabled} />
                </FormControl>
                <FormControl {...props} variant="outline" brick="right" flat="top">
                    <StyledInput value="Input value" disabled={props.disabled} />
                </FormControl>
                <FormControl {...props} variant="outline" brick="center">
                    <StyledInput value="Input value" disabled={props.disabled} />
                </FormControl>
                <FormControl {...props} variant="outline" brick="left" flat="top">
                    <StyledInput value="Input value" disabled={props.disabled} />
                </FormControl>
            </div>
        </>
    ),
};
