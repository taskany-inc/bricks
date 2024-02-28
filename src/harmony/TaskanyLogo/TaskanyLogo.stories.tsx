import { Meta, StoryObj } from '@storybook/react';

import { TaskanyLogo } from './TaskanyLogo';

const meta: Meta = {
    title: '@harmony/TaskanyLogo',
    component: TaskanyLogo,
};

export default meta;

export const Default: StoryObj<typeof TaskanyLogo> = {
    args: {
        size: 'l',
    },
};

export const WithCustomIcon: StoryObj<typeof TaskanyLogo> = {
    args: {
        size: 'l',
        src: 'https://cdn.freelogovectors.net/wp-content/uploads/2023/09/jira-software_logo-freelogovectors.net_.png',
    },
};
