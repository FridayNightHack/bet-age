module.exports = {
  plugins: {
    tailwindcss: {},
    'postcss-pxtorem': {
      rootValue: 16, // 1rem = 16px
      propList: ['*'], // конвертить все свойства
    },
    autoprefixer: {},
  },
};
