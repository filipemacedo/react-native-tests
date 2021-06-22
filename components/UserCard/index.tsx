import React from "react";
import { Linking } from "react-native";
import { Container, UsernameText, ProfileImage } from "./styles";

interface UserCardProps {
  user: any;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  async function onPress(): Promise<void> {
    const isSupported = await Linking.canOpenURL(user.htmlUrl);

    if (isSupported) {
      return Linking.openURL(user.htmlUrl)
    }
  }

  return (
    <Container onPress={onPress} testID="userCard">
      <ProfileImage source={{ uri: user.avatarUrl }} />
      <UsernameText testID="usernameText">{user.login}</UsernameText>
    </Container>
  );
};

export default UserCard;
