import React from "react";
import { fireEvent, waitFor } from "react-native-testing-library";
import { HomePageObject } from "../page-objects/HomePageObject";
import { render } from "react-native-testing-library";
import Home from "../../screens/Home";
import { act } from "react-test-renderer";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import UserCard from "../../components/UserCard";
import { Linking } from "react-native";

const mock = new MockAdapter(axios);

describe("SearchUsers", () => {
  afterEach(() => {
    mock.reset();
  });

  it("should render home screen", async () => {
    mock
      .onGet(/users*/)
      .reply(200, { total_count: 0, incomplete_results: false, items: [] });

    const page = new HomePageObject(render(<Home />));

    await act(async () => {
      const isVisible = await page.isVisible();

      expect(isVisible).toBeTruthy();
    });
  });

  it("should render users list then change input value", async () => {
    mock
      .onGet(/users*/)
      .reply(200, { total_count: 0, incomplete_results: false, items: [] });

    const page = new HomePageObject(render(<Home />));

    const isVisible = await waitFor(() => page.isVisibleNoMessageData());

    expect(isVisible).toBeTruthy();

    mock.reset();

    mock.onGet(/users*/).reply((config) => {
      const { q } = config.params;

      return [
        200,
        {
          total_count: 2,
          incomplete_results: false,
          items: [
            {
              login: "Filipe",
              id: 27786693,
              node_id: "MDQ6VXNlcjI3Nzg2Njkz",
              avatar_url:
                "https://avatars.githubusercontent.com/u/27786693?v=4",
              gravatar_id: "",
              url: "https://api.github.com/users/Filipe",
              html_url: "https://github.com/Filipe",
              followers_url: "https://api.github.com/users/Filipe/followers",
              following_url:
                "https://api.github.com/users/Filipe/following{/other_user}",
              gists_url: "https://api.github.com/users/Filipe/gists{/gist_id}",
              starred_url:
                "https://api.github.com/users/Filipe/starred{/owner}{/repo}",
              subscriptions_url:
                "https://api.github.com/users/Filipe/subscriptions",
              organizations_url: "https://api.github.com/users/Filipe/orgs",
              repos_url: "https://api.github.com/users/Filipe/repos",
              events_url:
                "https://api.github.com/users/Filipe/events{/privacy}",
              received_events_url:
                "https://api.github.com/users/Filipe/received_events",
              type: "User",
              site_admin: false,
              score: 1.0,
            },
            {
              login: "filipedeschamps",
              id: 4248081,
              node_id: "MDQ6VXNlcjQyNDgwODE=",
              avatar_url: "https://avatars.githubusercontent.com/u/4248081?v=4",
              gravatar_id: "",
              url: "https://api.github.com/users/filipedeschamps",
              html_url: "https://github.com/filipedeschamps",
              followers_url:
                "https://api.github.com/users/filipedeschamps/followers",
              following_url:
                "https://api.github.com/users/filipedeschamps/following{/other_user}",
              gists_url:
                "https://api.github.com/users/filipedeschamps/gists{/gist_id}",
              starred_url:
                "https://api.github.com/users/filipedeschamps/starred{/owner}{/repo}",
              subscriptions_url:
                "https://api.github.com/users/filipedeschamps/subscriptions",
              organizations_url:
                "https://api.github.com/users/filipedeschamps/orgs",
              repos_url: "https://api.github.com/users/filipedeschamps/repos",
              events_url:
                "https://api.github.com/users/filipedeschamps/events{/privacy}",
              received_events_url:
                "https://api.github.com/users/filipedeschamps/received_events",
              type: "User",
              site_admin: false,
              score: 1.0,
            },
          ].filter(({ login }) =>
            login.toLowerCase().includes(q.toLowerCase())
          ),
        },
      ];
    });

    page.search("filipe");

    const listIsVisible = await waitFor(() => page.isVisibleUsersList(), {
      timeout: 3000,
    });

    expect(listIsVisible).toBeTruthy();

    const usersListInstance = page.getUsersList();

    const users = usersListInstance.findAllByType(UserCard);

    expect(users).toHaveLength(2);

    const userContainer = users[0].find(
      (node) => node.props.testID === "userCard"
    );

    await fireEvent.press(userContainer);

    await waitFor(() => expect(Linking.openURL).toHaveBeenCalled());
    await waitFor(() => expect(Linking.canOpenURL).toHaveBeenCalled());
  });

  it("should render error message when request failed", async () => {
    mock.onGet(/users*/).reply(401, { message: "Unauthorized" });

    const page = new HomePageObject(render(<Home />));

    page.search("filipe");

    const errorIsVisible = await waitFor(() => page.isVisibleErrorMessage(), {
      timeout: 2000,
    });

    expect(errorIsVisible).toBeTruthy();
  });
});
