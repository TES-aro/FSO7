import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import react from 'eslint-plugin-react';

export default [
	{ ignores: ['dist'] },
	{
		files: ['**/*.{js,jsx}'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: { ...globals.vitest, ...globals.browser },
			parserOptions: {
				ecmaVersion: 'latest',
				ecmaFeatures: { jsx: true },
				sourceType: 'module'
			}
		},
		plugins: {
			'react': react,
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh
		},
		rules: {
			...js.configs.recommended.rules,
			...reactHooks.configs.recommended.rules,
			...react.configs.recommended.rules,
			// suppress errors for missing 'import React' in files
   		'react/react-in-jsx-scope': 'off',
   		// Let's save worrying about types for later and enjoy this shite code
   		'react/prop-types': 'off',
			'no-unused-vars': ['error', { varsIgnorePattern: '^_[a-zA-Z0-9]*$' }],
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true }
			],
			indent: ['error', 'tab'],
			'linebreak-style': ['error', 'unix'],
			quotes: ['error',  'single', { 'avoidEscape': true }],
			semi: ['error', 'always', { 'omitLastInOneLineBlock': true }],
			eqeqeq: 'error',
			'no-trailing-spaces': 'error',
			'object-curly-spacing': ['error', 'always'],
			'arrow-spacing': ['error', { before: true, after: true }],
			'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }],
			'no-console': 'off'
		}
	}
];
