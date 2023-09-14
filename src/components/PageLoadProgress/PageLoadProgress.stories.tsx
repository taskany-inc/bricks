import React, { useRef } from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { Button } from '../Button/Button';

import { PageLoadProgress, PageLoadProgressRef } from './PageLoadProgress';

const meta: Meta<typeof PageLoadProgress> = {
    title: 'Page Load Progress',
    component: PageLoadProgress,
    argTypes: {
        start: {
            name: 'Start value',
            defaultValue: 0.05,
        },
        max: {
            name: 'Max value',
            defaultValue: 0.995,
        },
        stripped: {
            name: 'Stripped Bar',
            type: 'boolean',
            defaultValue: true,
        },
    },
};

export default meta;

export const Default: StoryFn<typeof PageLoadProgress> = (props) => {
    const ref = useRef<PageLoadProgressRef>(null);

    return (
        <>
            <PageLoadProgress {...props} ref={ref} />
            <div style={{ marginTop: '20px' }}>
                <Button onClick={() => ref.current?.start()} text="Start" />
                <Button onClick={() => ref.current?.done()} text="Stop" />
            </div>
        </>
    );
};
