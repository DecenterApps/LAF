module.exports = {
  'extends': 'eslint-config-airbnb',
  'env': {
    'browser': true
  },
  'rules': {
    'jsx-a11y/href-no-hash': 'off',
    'jsx-a11y/anchor-is-valid': ['warn', { 'aspects': ['invalidHref'] }],
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/label-has-for': 0,
    'comma-dangle': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-filename-extension': 0,
    'arrow-parens': 0,
    'import/extensions': 0
  },
  'plugins': [
    'react', 'import'
  ]
};