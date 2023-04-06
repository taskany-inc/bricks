import React from 'react';
import type { Preview } from '@storybook/react';
import { LightTheme } from '@taskany/colors';

import { TextStyle } from '../src/components/Text';

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        layout: 'centered',
    },
    decorators: [
        (Story) => (
            <>
                <LightTheme/>
                <TextStyle />
                <Story />
            </>
        )
    ],
};

export default preview;
