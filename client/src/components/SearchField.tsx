import React, { ChangeEvent, KeyboardEvent, FunctionComponent, useState, useContext } from 'react';
import { Button } from '@mui/material';
import styled from 'styled-components';

import { getFoodRecipeList, searchFoodRecipe } from '../api/foodRecipe';
import SearchIcon from '../assets/searchIcon.svg';
import FoodRecipeContext from '../providers/foodRecipe';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchBar = styled.input`
  width: 250px;
  height: 30px;
  padding-left: 42px;
  background-image: url(${SearchIcon});
  background-repeat: no-repeat;
  background-position: left;
  background-position-x: 10px;
  outline: none;
  border-radius: 6px;
  border: 1px solid gray;
  margin-right: 15px;
`;

const StyledButton = styled(Button)`
  &&& {
    height: 30px;
    margin: 0 15px;
    color: #002447;
    background-color: #ffffff;
    font-style: normal;
    font-weight: 400;
  }
`;

interface Props {
  onChange?: (s: string) => void;
  onSearch?: (s: string) => void;
}

const SearchField: FunctionComponent<Props> = ({ onChange, onSearch }) => {
  const [searchText, setSearchText] = useState('');
  const { dispatch } = useContext(FoodRecipeContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    if (typeof onChange === 'function') onChange(e.target.value);
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (typeof onSearch === 'function') onSearch(searchText);
    }
  }

  const handleSearch = async () => {
    if (searchText !== '') await searchFoodRecipe(searchText, dispatch);
    else await getFoodRecipeList(dispatch);
  }

  return (
    <Container>
      <SearchBar
        type={'text'}
        value={searchText}
        placeholder={'Search Food Recipes'}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <StyledButton onClick={handleSearch}>
        Search
      </StyledButton>
    </Container>
  )
}

export default SearchField;