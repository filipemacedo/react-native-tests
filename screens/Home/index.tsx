import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Search from "../../components/Search";
import UsersList from "../../components/UsersList";
import useGetUsers from "../../hooks/api/useGetUsers";
import useDebounce from "../../hooks/useDebounce";
import { Container, NotDataMessage } from "./styles";
import { Pressable, Text } from "react-native";

const Home: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const { data, loading, error, setQuery } = useGetUsers();

  const navigate = useNavigation();

  useDebounce(() => {
    setQuery(search);
  }, [search]);

  function handleSearchInputChange(text: string) {
    setSearch(text);
  }

  return (
    <Container testID="HomeScreen">
      <Search onChangeText={handleSearchInputChange} />
      {!data.length && !loading ? (
        <NotDataMessage testID="noMessageData">
          Nenhum usuário a ser exibido
        </NotDataMessage>
      ) : (
        <UsersList users={data} />
      )}
      {error && (
        <NotDataMessage testID="errorMessage">Ocorreu um erro.</NotDataMessage>
      )}
      <Pressable
        testID="pressable"
        onPress={() => {
          navigate.navigate("NotFound");
        }}
      >
        <Text>Clique aqui</Text>
      </Pressable>
    </Container>
  );
};

export default Home;
