import { GlobalWithFetchMock } from "jest-fetch-mock";

require("jest-fetch-mock").enableMocks();

const customGlobal: GlobalWithFetchMock = global as any;

customGlobal.fetch = require("jest-fetch-mock");
customGlobal.fetchMock = customGlobal.fetch;

jest.mock("react-native-gesture-handler", () => ({
  PanGestureHandler: "PanGestureHandler",
  BaseButton: "BaseButton",
}));
