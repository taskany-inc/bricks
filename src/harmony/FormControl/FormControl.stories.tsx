import * as React from 'react';
import type { Meta } from '@storybook/react';

import { nullable } from '../../utils';

import { FormControl, FormControlEditor, FormControlError, FormControlInput, FormControlLabel } from './FormControl';

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
            <FormControl style={{ marginBottom: 40 }}>
                <FormControlLabel>Email</FormControlLabel>
                <FormControlInput placeholder="email@example.com" />
                <FormControlError>Some error</FormControlError>
            </FormControl>
            <FormControl>
                <FormControlLabel>Description</FormControlLabel>
                <FormControlEditor placeholder="Description" />
                <FormControlError>Some error</FormControlError>
            </FormControl>
        </>
    );
};

export const Required = () => {
    return (
        <FormControl style={{ marginBottom: 40, width: '300px' }} required>
            <FormControlLabel>Name</FormControlLabel>
            <FormControlInput placeholder="Enter the name" value="John" size="m" outline />
        </FormControl>
    );
};

export const AllControls = () => {
    return (
        <>
            <Default />
            <Required />
            <ErrorControl />
        </>
    );
};

export const Editor = () => {
    const [value, setValue] = React.useState<string>();
    const [name, setName] = React.useState<string>();
    const [date, setDate] = React.useState<Date | string>();

    return (
        <>
            <FormControl style={{ marginBottom: 40, width: '300px' }} required>
                <FormControlLabel>Name</FormControlLabel>
                <FormControlInput
                    placeholder="Enter the name"
                    value={name}
                    size="m"
                    outline
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>
            <FormControl style={{ width: '500px' }}>
                <FormControlLabel>Code</FormControlLabel>
                <FormControlEditor outline placeholder="Your decision here" value={value} onChange={setValue} />
            </FormControl>
            <FormControl style={{ marginBottom: 40, width: '500px' }}>
                <FormControlLabel>Date</FormControlLabel>
                <FormControlInput
                    placeholder="Enter the name"
                    value={String(date)}
                    type="date"
                    size="m"
                    outline
                    onChange={(e) => setDate(e.target.value)}
                />
                {nullable(!date, () => (
                    <FormControlError>Some error</FormControlError>
                ))}
            </FormControl>
        </>
    );
};

export { Default, ErrorControl };
