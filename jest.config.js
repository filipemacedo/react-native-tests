module.exports = {
  preset: "jest-expo",
  moduleFileExtensions: ["ts", "tsx", "js"],
  transform: {
    "^.+\\.js$": "<rootDir>/node_modules/react-native/jest/preprocessor.js",
  },
  transformIgnorePatterns: ["node_modules/(?!(react-navigation-stack))/"],
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  testPathIgnorePatterns: ["\\.snap$", "<rootDir>/node_modules/"],
  cacheDirectory: ".jest/cache",
  setupFiles: ["./jest.setup.ts"],
  moduleDirectories: [".", "node_modules"],
  resetMocks: true,
};
