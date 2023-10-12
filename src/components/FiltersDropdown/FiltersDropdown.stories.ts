import type { Meta, StoryObj } from '@storybook/react';

import { FiltersDropdown } from './FiltersDropdown';

const meta: Meta<typeof FiltersDropdown> = {
    title: 'FiltersDropdown',
    component: FiltersDropdown,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        items: [
            { id: '1', data: 'Reservoir Dogs' },
            { id: '2', data: 'Pulp Fiction' },
            { id: '3', data: 'Jackie Brown ' },
            { id: '4', data: 'Kill Bill: Vol. 1' },
            { id: '5', data: 'Kill Bill: Vol. 2 ' },
            { id: '6', data: 'Death Proof' },
            { id: '7', data: 'Inglourious Basterds' },
            { id: '8', data: 'Django Unchained' },
            { id: '9', data: 'The Hateful Eight' },
            { id: '10', data: 'Once Upon a Time in Hollywood' },
        ],
        value: [],
        text: 'Quentin Tarantino filmography',
    },
};
