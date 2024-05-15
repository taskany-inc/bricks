import path from "path";
import { fileURLToPath } from 'node:url'
import { defineConfig } from "vite";
import dts from 'vite-plugin-dts';
import { glob } from 'glob';
import react from '@vitejs/plugin-react';
import external from '@yelo/rollup-node-external';
import autoReExportPlugin from "unplugin-auto-re-export/vite";
import { exitProcess } from "./.vite/plugins/exitProcess";

const ignore = ['src/**/*.d.ts', 'src/**/*.stories.{ts,tsx}', 'src/**/*.test.{ts,tsx}']

export default defineConfig({
    css: {
        modules: true,
    },
    build: {
        copyPublicDir: false,
        outDir: './lib',
        target: "esnext",
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            formats: ["es"]
        },
        rollupOptions: {
            external: external(),
            input: Object.fromEntries(
                    glob.sync('src/**/*.{ts,tsx}', { ignore }).map(file => [
                            path.relative(
                                'src',
                                file.slice(0, file.length - path.extname(file).length)
                            ),
                            fileURLToPath(new URL(file, import.meta.url))
                    ])
                ),
            output: {
                entryFileNames: '[name].js',
                assetFileNames: 'harmony/[name].[ext]',
                globals: {
                    react: 'React'
                },
            },
            plugins: [
                react({
                    babel: {
                        plugins: [
                            [
                                "styled-components", {
                                    namespace: process.env.SC_NAMESPACE,
                                    displayName: false,
                                }
                            ]
                        ]
                    }
                }),
                dts({ include: ['src'] }),
                autoReExportPlugin({
                    dir: ["src/components", "src/harmony", "src/hooks", "src/utils"],
                    exportAll: true,
                    outputFile: 'index.ts',
                    ignore: [
                        '**/*.stories.*',
                        '**/*.d.*',
                        'src/utils/detectPlatform.*',
                        'src/utils/getGroupedCSSVariables.*',
                        'src/utils/getInitials.*',
                        'src/utils/preloadImage.*',
                        'src/utils/stringToColor.*',
                        'src/utils/translit.test.*',
                        'src/harmony/Editor/Editor.*',
                        'src/harmony/Group/Group.*',
                    ],
                }),
                exitProcess(),
            ],
        },
        minify: true,
    },
});
