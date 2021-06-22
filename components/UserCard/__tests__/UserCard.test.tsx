import React from "react";
import renderer from "react-test-renderer";
import UserCard from "..";
import faker from "faker";
import { Container, ProfileImage, UsernameText } from "../styles";

import "jest-styled-components/native";

const getUser = () => ({
  htmlUrl: faker.internet.url(),
  avatarUrl: faker.internet.avatar(),
  login: faker.internet.userName(),
});

const render = () => {
  const user = getUser();

  const testRenderer = renderer.create(<UserCard user={user} />);
  const testInstance = testRenderer.root;

  const containerInstance = testInstance.findByType(Container);
  const profileImageInstance = containerInstance.findByType(ProfileImage);
  const usernameTextInstance = testInstance.findByType(UsernameText);

  return {
    testInstance,
    testRenderer,
    containerInstance,
    profileImageInstance,
    usernameTextInstance,
    userMock: user,
  };
};

describe("UserCard component", () => {
  it("should render with correct props", () => {
    const {
      testInstance,
      containerInstance,
      profileImageInstance,
      usernameTextInstance,
      userMock,
    } = render();


    expect(testInstance).toBeTruthy();
    expect(containerInstance).toBeTruthy();
    expect(profileImageInstance).toBeTruthy();
    expect(usernameTextInstance).toBeTruthy();
    expect(profileImageInstance.props.source).toMatchObject({
      uri: userMock.avatarUrl,
    });
    expect(usernameTextInstance.props.children).toBe(userMock.login)
  });
});
