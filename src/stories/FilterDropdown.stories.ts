import type { Meta, StoryObj } from '@storybook/react';

import { FiltersDropdown } from '../components/FiltersDropdown';

const meta: Meta<typeof FiltersDropdown> = {
    title: 'FiltersDropdown',
    component: FiltersDropdown,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        items: [
            { id: '1', data: 'Wow so much big' },
            { id: '2', data: 'Wow so much small' },
        ],
        value: [],
        text: 'how you like me now?',
    },
};
