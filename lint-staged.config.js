module.exports = {
  'src/**/*.{ts,tsx}': [
    'yarn tsc',
    'yarn extract-translations',
    'yarn lint:ts',
    'yarn prettier:ts',
    'yarn test',
    'git add',
  ],
  'api/src/**/*.{ts,tsx}': [
    'yarn tsc',
    'yarn lint:ts',
    'yarn prettier:ts',
    'git add',
  ],
};
