import type { StorybookConfig } from '@storybook/react-vite';
import { defineConfig } from 'vite';
import { resolve } from 'node:path/posix';

const config: StorybookConfig = {
    stories: [
        '../src/**/*.mdx',
        '../src/**/*.stories.@(js|jsx|ts|tsx)',
        './external/**/*.mdx',
        './external/**/*.stories.tsx',
    ],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
    core: {
        builder: '@storybook/builder-vite',
    },
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    docs: {
        autodocs: 'tag',
    },
    staticDirs: ['./public'],
    viteFinal: (config, { configType }) => {
        if (configType === 'DEVELOPMENT') {
            config.resolve = {
                ...config.resolve,
                alias: {
                    ...config.resolve?.alias,
                    react: resolve(process.cwd(), 'node_modules', 'react'),
                    'react-dom': resolve(process.cwd(), 'node_modules', 'react-dom'),
                    '@taskany': resolve(process.cwd(), 'node_modules', '@taskany'),
                },
            };
        }

        return defineConfig({
            ...config,
            assetsInclude: ['/sb-preview/runtime.js', '/dark.css', '/light.css'],
        });
    },
};
export default config;
