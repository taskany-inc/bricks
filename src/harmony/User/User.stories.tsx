import { Meta, StoryObj } from '@storybook/react';

import { User } from './User';

const meta: Meta<typeof User> = {
    title: '@harmony/User',
    component: User,
};

export default meta;

export const Default: StoryObj<typeof User> = {
    args: {
        name: 'John Doe',
        email: 'john_doe_77@taskany-inc.io',
        src: 'https://secure.gravatar.com/avatar/51d3c935ea5453b2915e6180a9944c11/?default=https%3A%2F%2Fvanillicon.com%2F8fff907b6502f8011495fb154ec1c0a2_200.png&rating=g&size=560',
    },
};
