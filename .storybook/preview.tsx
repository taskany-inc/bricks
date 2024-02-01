import React from 'react';
import type { Decorator, Preview } from '@storybook/react';
import { DarkTheme, LightTheme, backgroundColor, fontDisplay, textColor } from '@taskany/colors';
import { createGlobalStyle } from 'styled-components';
import darkTheme from '@taskany/colors/harmony/dark.css?inline';
import lightTheme from '@taskany/colors/harmony/light.css?inline';

import { TextStyle } from '../src/components/Text/Text';

const GlobalStyle = createGlobalStyle`
    html, body {
        font-family: ${fontDisplay};
        color: ${textColor};
        background-color: ${backgroundColor};
    }
`;

const CSSThemeMap = {
    dark: darkTheme,
    light: lightTheme,
};

const SCThemeMap = {
    dark: DarkTheme,
    light: LightTheme,
};

const withTheme: Decorator = (StoryFn, context) => {
    const { theme } = context.globals;
    const Theme = SCThemeMap[theme];

    return (
        <>
            <Theme />
            <GlobalStyle />
            <TextStyle />
            <StoryFn />
            <style>{CSSThemeMap[theme]}</style>
        </>
    );
};

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
        defaultValue: 'dark',
        toolbar: {
            icon: 'circlehollow',
            items: [
                { value: 'light', icon: 'circlehollow', title: 'light' },
                { value: 'dark', icon: 'circle', title: 'dark' },
            ],
            showName: true,
        },
    },
};
