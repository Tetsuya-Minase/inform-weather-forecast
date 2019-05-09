module.exports = {
    'env': {
        'browser': true,
        'es6': true,
    },
    'extends': [
        //'google',
        'prettier',
        'plugin:prettier/recommended'
    ],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly',
    },
    'plugins': [
        '@typescript-eslint',
        'prettier'
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 2018,
        'sourceType': 'module',
        'project': './tsconfig.json'
    },
    'rules': {
        '@typescript-eslint/adjacent-overload-signatures': 'error',
        '@typescript-eslint/no-unused-vars': 'off',
        'prettier/prettier': ['error', {'singleQuote': true}]
    },
};
