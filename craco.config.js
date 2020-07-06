const { whenDev, whenProd, whenTest } = require("@craco/craco");
const reactHotReloadPlugin = require('craco-plugin-react-hot-reload');
const imageOptimizer = require('craco-image-optimizer-plugin');

module.exports = {
  plugins: [
    { plugin: reactHotReloadPlugin },

    // alternative
    // https://www.npmjs.com/package/imagemin-webpack-plugin
    // https://www.npmjs.com/package/imagemin-webpack
    {
      plugin: imageOptimizer,
      // image-webpack-plugin options
      options: {
        mozjpeg: {
          progressive: false,
          quality: 65,
        },
        // optipng.enabled: false will disable optipng
        optipng: {
          // optimizationLevel: 5
          enabled: false,
        },
        pngquant: {
          quality: [0.65, 0.9],
          speed: 4,
        },
        gifsicle: {
          interlaced: false,
        },
        // the webp option will enable WEBP
        webp: {
          quality: 75,
        },
        svgo: {
          plugins: [
            {
              removeViewBox: false
            }
          ]
        }
      },
    },
  ],
};
