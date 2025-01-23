import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { GlobalSearch } from './GlobalSearch';

const meta: Meta = {
    title: '@harmony/GlobalSearch',
    component: GlobalSearch,
};

export default meta;

export const Default: StoryObj<typeof GlobalSearch> = {
    render: (args) => {
        const [query, setQuery] = useState('');

        return (
            <div style={{ width: 500 }}>
                <GlobalSearch
                    {...args}
                    value={query}
                    onChange={setQuery}
                    searchResultExists={query.length > 2}
                    expandable
                    placeholder="Search or jump to..."
                    keyboardIcon
                >
                    hello world
                </GlobalSearch>
            </div>
        );
    },
};
