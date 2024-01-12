import React, { useCallback, useState } from 'react';
import { action } from '@storybook/addon-actions';
import { Meta, StoryFn } from '@storybook/react';
import { IconQuestionCircleOutline } from '@taskany/icons';

import { Button } from '../Button/Button';
import { Form } from '../Form';
import { Popup } from '../Popup/Popup';
import { FormInput } from '../FormInput/FormInput';

import { InlineForm } from './InlineForm';

export default {
    title: 'InlineForm',
    component: InlineForm,
    argTypes: {
        onSubmit: { action: 'form submitted' },
        onClick: { action: 'clecked' },
        onMouseOver: { action: 'onMouseOver' },
        onMouseLeave: { action: 'onMouseLeave' },
        onChange: { action: 'onChange' },
    },
} as Meta<typeof InlineForm>;

export const InlineFormStories: StoryFn = () => {
    return (
        <>
            <Form
                onSubmit={action('form submitted')}
                style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}
            >
                <FormInput autoFocus brick="right" placeholder={'Enter criteria'} onChange={action('onChange')} />
                <FormInput
                    autoComplete="off"
                    placeholder={'No more than 100'}
                    brick="center"
                    onChange={action('onChange')}
                    style={{ border: '1px' }}
                />
                <Button text={'Add'} brick="left" type="submit" view="primary" size="l" outline />
                <a
                    onMouseOver={action('onMouseOver')}
                    onMouseLeave={action('onMouseLeave')}
                    style={{ marginLeft: '5px' }}
                >
                    <IconQuestionCircleOutline size="s" />
                </a>
                <Popup tooltip placement="top-end">
                    Hint
                </Popup>
            </Form>
        </>
    );
};

export const InlineFormErrorHandler: StoryFn = () => {
    const [error, setError] = useState<{ message: string } | undefined>();
    const onError = useCallback((e: unknown) => {
        if (e instanceof Error) {
            setError({ message: e.message });
        }
    }, []);

    return (
        <>
            <InlineForm
                onSubmit={() => {
                    throw new Error('Submit Error');
                }}
                onError={onError}
                onReset={() => setError(undefined)}
                renderTrigger={({ onClick }) => (
                    <Button onClick={onClick} text={'Show Form'} view="primary" size="l" outline />
                )}
            >
                <div style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                    <FormInput
                        error={error}
                        autoFocus
                        brick="right"
                        placeholder={'Enter text'}
                        onChange={action('onChange')}
                    />
                    <Button text={'Add'} brick="left" type="submit" view="primary" size="l" outline />
                </div>
            </InlineForm>
        </>
    );
};
