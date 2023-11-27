import React from 'react';
import type { Preview } from '@storybook/react';
import { LightTheme } from '@taskany/colors';
import '@taskany/colors/harmony/dark.css';
import '@taskany/colors/harmony/light.css';

import { TextStyle } from '../src/components/Text/Text';

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
