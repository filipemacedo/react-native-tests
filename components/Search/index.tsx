import React from "react";
import SearchInput from "../SearchInput";

import { Container, Message } from "./styles";

interface SearchProps {
  onChangeText(text: string): void;
}

const Search: React.FC<SearchProps> = ({ onChangeText }) => {
  return (
    <Container>
      <Message>Explore o melhor do mundo open-source</Message>
      <SearchInput onChangeText={onChangeText} />
    </Container>
  );
};

export default Search;
