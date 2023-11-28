import React, { useEffect } from 'react';
import type { Decorator, Preview } from '@storybook/react';
import { DarkTheme, LightTheme, backgroundColor } from '@taskany/colors';
import styled from 'styled-components';

import '@taskany/colors/harmony/dark.css';
import '@taskany/colors/harmony/light.css';

import { TextStyle } from '../src/components/Text/Text';

const ThemeBlock = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    padding: 1rem;
    background: ${backgroundColor};
`

const withTheme: Decorator = (StoryFn, context) => {
    const { theme } = context.globals
    const Theme = theme === 'dark' ? DarkTheme : LightTheme

    useEffect(() => {
        document.body.setAttribute('data-theme', theme)
    }, [theme])

    return (
        <>
            <Theme />
            <TextStyle />
            <ThemeBlock theme={theme}>
                <StoryFn />
            </ThemeBlock>
        </>
    )
}

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
    decorators: [withTheme],
};

export default preview;

export const globalTypes = {
    theme: {
        name: 'Theme',
        description: 'Global theme for components',
        defaultValue: 'light',
        toolbar: {
            icon: 'circlehollow',
            items: [
            { value: 'light', icon: 'circlehollow', title: 'light' },
            { value: 'dark', icon: 'circle', title: 'dark' },
            ],
            showName: true,
        },
    },
}
