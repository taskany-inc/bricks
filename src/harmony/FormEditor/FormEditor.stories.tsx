import React, { ReactNode } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { FormControl, FormControlEditor, FormControlError } from '../FormControl/FormControl';

import { FormEditor } from './FormEditor';

const meta: Meta = {
    title: '@harmony/FormEditor',
    component: FormEditor,
};

export default meta;

const Layout = ({ children }: { children: ReactNode }) => <div style={{ width: 500 }}>{children}</div>;

export const Default: StoryObj<typeof FormEditor> = {
    args: {
        outline: true,
        placeholder: 'Some placeholder...',
    },
    render(props) {
        return (
            <Layout>
                <FormEditor {...props} />
            </Layout>
        );
    },
};

export const FormControlWithEditor = () => {
    return (
        <Layout>
            <FormControl>
                <FormControlEditor placeholder="Description..." />
                <FormControlError>Random error</FormControlError>
            </FormControl>
        </Layout>
    );
};
