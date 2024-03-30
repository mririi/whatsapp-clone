module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module:react-native-dotenv',
        {
          moduleName: "@env",
          path: ".env",
        },
      ],
      [
        "module-resolver",
        {
          root: ["."],
          alias: {
            "@store": "./src/store",
            "@constants": "./src/constants",
            "@components": "./src/components",
            "@navigation": "./src/navigation",
            "@screens": "./src/screens",
            "@assets": "./assets",
            "@firebaseConf": "./firebaseConfig",
          },
        },
      ],
    ],
  };
};