import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  display: flex;
  border-radius: 7px;
  flex: 1;
  max-height: 80px;
  margin-bottom: 16px;
  border-radius: 7px;
  background: #222;
  align-items: center;
  flex-direction: row;
`;

export const UsernameText = styled.Text`
  font-size: 14px;
  font-weight: normal;
  color: #888;
`;

export const VisitButton = styled.Button`
  width: 100px;
  height: 80px;
  background: #fff;
  border: 2px solid #eee;
  color: #222;
`;

export const ProfileImage = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: ${50 / 2}px;
  margin: 13px;
`;
