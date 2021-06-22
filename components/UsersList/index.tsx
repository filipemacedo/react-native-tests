import React from "react";
import UserCard from "../UserCard";

import { List } from "./styles";

export type UsersListProps = {
  users: any[];
};

const UsersList: React.FC<UsersListProps> = ({ users }) => {
  return (
    <List showsVerticalScrollIndicator={false} testID="usersList">
      {users.map((user) => (
        <UserCard user={user} key={user.login} />
      ))}
    </List>
  );
};

export default React.memo(UsersList);
