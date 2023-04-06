const plugins = ['inline-react-svg'];
const ignore = ['**/*.d.ts', '**/*.stories.ts', '**/*.stories.tsx'];

module.exports = {
    env: {
        cjs: {
            sourceType: 'unambiguous',
            presets: [['@babel/preset-env', {
                "modules": "commonjs",
            }], '@babel/preset-react', '@babel/preset-typescript'],
            plugins,
            ignore,
        },
        esm: {
            presets: [
                [
                    '@babel/preset-env',
                    {
                        modules: false,
                    },
                ],
                '@babel/preset-react',
                '@babel/preset-typescript',
            ],
            plugins,
            ignore,
        },
        dev: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
            plugins,
        },
    },
};