module.exports = {
  transpileDependencies: ["vuetify"],
  chainWebpack: (config) => {
    config.performance.maxEntrypointSize(400000).maxAssetSize(400000);
  },
  pwa: {
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "./src/sw.js",
      swDest: "service-worker.js",
    },
    themeColor: "#fffafa",
    msTileColor: "#fffafa",
    appleMobileWebAppCache: "yes",
    manifestOptions: {
      background_color: "#fffafa",
    },
    iconPaths: {
      favicon32: './src/assets/images/logo.png',
   },
  },
};
