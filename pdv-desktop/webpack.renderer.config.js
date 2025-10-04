const Dotenv = require('dotenv-webpack'); // 1. Importamos o plugin

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', { "runtime": "automatic" }]
            ]
          }
        }
      },
    ],
  },
  // 2. Adicionamos a seção de plugins para carregar o .env
  plugins: [
    new Dotenv()
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
};