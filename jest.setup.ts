import { GlobalWithFetchMock } from "jest-fetch-mock";
import "react-native-gesture-handler/jestSetup";

require("jest-fetch-mock").enableMocks();

jest.mock('react-native/Libraries/LogBox/LogBox');

jest.setTimeout(90000)

jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

console.warn = jest.fn()

const customGlobal: GlobalWithFetchMock = global as any;

customGlobal.fetch = require("jest-fetch-mock");
customGlobal.fetchMock = customGlobal.fetch;

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
  BaseButton: "BaseButton",
}));
