import js from '@eslint/js';
import prettier from 'eslint-config-prettier';

/** @type {import("eslint").Linter.Config[]} */
export default [
    js.configs.recommended,

    // Browser JS files
    {
        files: ['src/**/*.js'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
        },
        env: {
            browser: true,
        },
        rules: {
            'no-console': 'off',
            'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        },
    },

    // Node.js scripts like webpack configs
    {
        files: ['webpack.*.js'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'commonjs',
            globals: {
                require: 'readonly',
                module: 'readonly',
                __dirname: 'readonly',
                console: 'readonly',
            },
        },
        rules: {
            'no-console': 'off',
        },
    },

    // Apply Prettier formatting compatibility
    prettier,
];
