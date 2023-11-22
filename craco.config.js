const {whenProd} = require('@craco/craco');
const imageOptimizer = require('craco-image-optimizer-plugin');

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
    },
  },
  babel: {
    plugins: whenProd(() => [['transform-remove-console', {exclude: ['error', 'warn']}]], []),
  },
  plugins: whenProd(
    () => [
      // alternative?
      // https://www.npmjs.com/package/imagemin-webpack-plugin
      {
        // https://www.npmjs.com/package/craco-image-optimizer-plugin
        plugin: imageOptimizer,
        // image-webpack-plugin options
        // https://github.com/tcoopman/image-webpack-loader
        options: {
          mozjpeg: {
            progressive: false,
            quality: 85,
            enabled: false,
          },
          // optipng.enabled: false will disable optipng
          optipng: {
            // optimizationLevel: 5 // default 3
            enabled: false,
          },
          pngquant: {
            quality: [0.9, 1],
            speed: 4, // default 4
            enabled: false,
          },
          gifsicle: {
            interlaced: false,
            enabled: false,
          },
          // the webp option will enable WEBP
          // the best compression ratio and speed (four time then png/jpg)
          webp: {
            // https://github.com/imagemin/imagemin-webp
            quality: 85,
            // method: 4,
            // nearLossless: 100,
            enabled: true,
          },
          svgo: {
            enabled: true,
            plugins: [
              {
                removeViewBox: false,
              },
            ],
          },
        },
      },
    ],
    []
  ),
};
