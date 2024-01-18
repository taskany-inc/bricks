import type { StorybookConfig } from '@storybook/react-webpack5';
import { resolve } from 'node:path/posix';

const config: StorybookConfig = {
    stories: [
        '../src/**/*.mdx',
        '../src/**/*.stories.@(js|jsx|ts|tsx)',
        './external/**/*.mdx',
        './external/**/*.stories.tsx',
    ],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
    framework: {
        name: '@storybook/react-webpack5',
        options: {},
    },
    docs: {
        autodocs: 'tag',
    },
    previewHead: (head) => `
        ${head}
        <link rel="stylesheet" href="/public/dark.css" id="harmony_theme"></link>
    `,
    staticDirs: ['./public'],
    webpackFinal: async (config) => {
        config.resolve = {
            ...config.resolve,
            alias: {
                ...config.resolve?.alias,
                react: resolve(process.cwd(), 'node_modules', 'react'),
                'react-dom': resolve(process.cwd(), 'node_modules', 'react-dom'),
                '@taskany': resolve(process.cwd(), 'node_modules', '@taskany'),
            },
        };

        const { rules = [] } = config.module || {};

        const styleRuleIndex = rules.findIndex((rule) => {
            if (rule != null && typeof rule === 'object') {
                if (rule.test instanceof RegExp) {
                    return /\.css$/.source === rule.test.source;
                }
            }

            return false;
        });

        if (styleRuleIndex > -1) {
            rules.splice(
                styleRuleIndex,
                1,
                {
                    test: /\.css$/,
                    exclude: /harmony\/(light|dark)\.css$/,
                    sideEffects: true,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                            },
                        },
                    ],
                },
                {
                    test: /harmony\/(light|dark)\.css$/,
                    sideEffects: true,
                    use: [
                        {
                            loader: 'style-loader',
                            options: {
                                injectType: 'linkTag',
                                attributes: {
                                    id: 'harmony',
                                },
                                esModule: false,
                                insert: () => {},
                            },
                        },
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'public',
                                esModule: false,
                            },
                        },
                    ],
                },
            );
        }

        return config;
    },
};
export default config;
