import * as React from 'react';
import type { Meta } from '@storybook/react';

import { nullable } from '../../utils';

import { FormControl, FormControlError, FormControlInput, FormControlLabel } from './FormControl';

const meta: Meta<typeof FormControl> = {
    title: 'Harmony/FormControl',
    component: FormControl,
};

export default meta;

const Default = () => {
    return (
        <FormControl style={{ marginBottom: 40 }}>
            <FormControlLabel>Email</FormControlLabel>
            <FormControlInput placeholder="email@example.com" />
        </FormControl>
    );
};

const ErrorControl = () => {
    const [value, setValue] = React.useState('');

    return (
        <>
            <FormControl style={{ marginBottom: 40 }}>
                <FormControlLabel>Write 4 symbols</FormControlLabel>
                <FormControlInput
                    placeholder="email@example.com"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                {nullable(value.length < 4 && { message: 'Some error' }, (error) => (
                    <FormControlError error={error} />
                ))}
            </FormControl>
            <FormControl>
                <FormControlLabel>Email</FormControlLabel>
                <FormControlInput placeholder="email@example.com" />
                <FormControlError>Some error</FormControlError>
            </FormControl>
        </>
    );
};

export const AllControls = () => {
    return (
        <>
            <Default />
            <ErrorControl />
        </>
    );
};

export { Default, ErrorControl };
