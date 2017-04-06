'use strict'

// Put this file to the directory where your browser code is located. This could be the root
// directory, or a subdirectory if your project consists of both node.js and browser code.
module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    '@strv/javascript/environments/react/v15',
    '@strv/javascript/environments/react/optional',
    '@strv/javascript/coding-styles/recommended',
  ],
  environments: {
    es6: true,
    browser: true
  },
  rules: {
    "no-case-declarations": 0,
    "capitalized-comments": 0,
    "generator-star-spacing": [1, { "before": true, "after": true }],
    "yield-star-spacing": [1, { "before": true, "after": true }],
    // "brace-style": [1, "stroustrup"],
  }
}