module.exports = ({ file, env }) => ({
  plugins: {
    'postcss-import': { root: file.dirname },
    autoprefixer: env === 'production' ? {} : false,
    cssnano: env === 'production' ? {} : false,
  },
});
