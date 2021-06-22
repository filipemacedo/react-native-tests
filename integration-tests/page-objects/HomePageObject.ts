import { RenderAPI, fireEvent } from "react-native-testing-library";
import { PageObject } from "./PageObject";

export class HomePageObject extends PageObject {
  private static searchInputId = "searchInput";
  private static noMessageDataId = "noMessageData";
  private static usersListId = "usersList";
  private static errorMessage = "errorMessage";

  constructor(app: RenderAPI) {
    super(app, "HomeScreen");
  }

  public getSearchInput() {
    return this.findByTestId(HomePageObject.searchInputId);
  }

  public getNoMessageData() {
    return this.findByTestId(HomePageObject.noMessageDataId);
  }

  public getUsersList() {
    return this.findByTestId(HomePageObject.usersListId);
  }

  public getErrorMessage() {
    return this.findByTestId(HomePageObject.errorMessage);
  }

  public isVisibleUsersList() {
    return !!this.getUsersList();
  }

  public isVisibleErrorMessage() {
    return !!this.getErrorMessage()
  }

  public isVisibleNoMessageData() {
    return !!this.getNoMessageData();
  }

  public search(query: string) {
    const searchInput = this.getSearchInput();

    fireEvent.changeText(searchInput, query);

    return searchInput
  }
}
