import React from "react";
import { Container, Input } from "./styles";

interface SearchInputProps {
  onChangeText(text: string): void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onChangeText }) => {
  return (
    <Container>
      <Input testID="searchInput" onChangeText={onChangeText} placeholder="Search" />
    </Container>
  );
};

export default SearchInput;
