import React from "react";
import TestRenderer from "react-test-renderer";
import UsersList, { UsersListProps } from "..";
import UserCard from "../../UserCard";
import { List } from "../styles";
import faker from "faker";

import "jest-styled-components/native";

const render = (props: UsersListProps) => {
  const testRenderer = TestRenderer.create(<UsersList {...props} />);

  const testInstance = testRenderer.root;

  return { testInstance, testRenderer };
};

describe("UsersList component", () => {
  it("should display a empty list with correct styles", () => {
    // when
    const usersListThree = TestRenderer.create(<List />).toJSON();

    // then
    expect(usersListThree).toHaveStyleRule("height", "100%");
    expect(usersListThree).toHaveStyleRule("display", "flex");
    expect(usersListThree).toHaveStyleRule("width", "100%");
  });

  it("should render empty list", () => {
    try {
      // given
      const props: UsersListProps = { users: [] };

      // when
      const { testInstance } = render(props);

      testInstance.findByType(UserCard);
    } catch (error) {
      // then
      expect(error).toBeTruthy();
    }
  });

  it("should render populated list", () => {
    const user = {
      htmlUrl: faker.internet.url(),
      avatarUrl: faker.internet.avatar(),
      login: faker.internet.userName(),
    };

    // given
    const props: UsersListProps = {
      users: [user],
    };

    // when
    const { testInstance } = render(props);

    const userCard = testInstance.findByType(UserCard);

    expect(userCard).toBeTruthy();
    expect(userCard.props).toMatchObject({ user });
  });
});
