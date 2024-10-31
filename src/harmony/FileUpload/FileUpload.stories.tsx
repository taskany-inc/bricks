import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { FileUpload } from './FileUpload';

const story: Meta<typeof FileUpload> = {
    title: '@harmony/FileUpload',
    component: FileUpload,
    args: {
        accept: {
            'application/pdf': [],
            'application/msword': [],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
        },
        translates: {
            idle: 'Choose file',
            active: 'Drop file here',
            loading: 'Loading',
            accepted: 'Loaded',
            error: "File doesn't load",
            fileExtensionsText: 'In *.pdf or *.doc / *.docx format',
        },
    },
};

export default story;

export const Default: StoryFn<typeof FileUpload> = (props) => (
    <div style={{ width: '400px', height: '50px' }}>
        <FileUpload {...props} />
    </div>
);
