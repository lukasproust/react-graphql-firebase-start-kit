module.exports = ({ file, env }) => ({
  plugins: {
    'postcss-import': { root: file.dirname },
    'postcss-cssnext': {},
    autoprefixer: env === 'production' ? {} : false,
    cssnano: env === 'production' ? {} : false,
  },
});
