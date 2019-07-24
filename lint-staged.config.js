module.exports = {
  '*.{ts,tsx}': [
    'yarn tsc',
    'yarn extract-translations',
    'yarn lint:ts',
    'yarn prettier:ts',
    'yarn test',
    'git add',
  ],
};
