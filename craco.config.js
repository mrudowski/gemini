const {whenProd} = require('@craco/craco');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = {
  webpack: {
    configure: {
      module: {
        rules: [
          {
            type: 'javascript/auto',
            test: /\.mjs$/,
            include: /node_modules/,
          },
        ],
      },
      optimization: {
        // https://github.com/webpack-contrib/image-minimizer-webpack-plugin/
        minimizer: whenProd(
          () => [
            new ImageMinimizerPlugin({
              minimizer: [
                {
                  implementation: ImageMinimizerPlugin.imageminMinify,
                  options: {
                    plugins: [
                      'imagemin-gifsicle',
                      ['imagemin-mozjpeg', {quality: 85, progressive: false}],
                      ['imagemin-pngquant', {quality: [0.9, 1], speed: 4}],
                      ['imagemin-webp', {quality: 85}],
                      [
                        'svgo',
                        {
                          plugins: [
                            {
                              name: 'preset-default',
                              params: {
                                overrides: {
                                  removeViewBox: false,
                                },
                              },
                            },
                          ],
                        },
                      ],
                    ],
                  },
                },
              ],
            }),
          ],
          []
        ),
      },
    },
  },
  babel: {
    plugins: whenProd(() => [['transform-remove-console', {exclude: ['error', 'warn']}]], []),
  },
};
