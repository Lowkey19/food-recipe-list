import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { getFoodRecipeList, searchFoodRecipe, setLoginState } from '../api/foodRecipe';
import FoodRecipeContext from '../providers/foodRecipe';
import FoodRecipeCard from './FoodRecipeCard';
import { getUserInfo } from '../api/auth';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 50px 100px;
`;

const FoodRecipeList: FunctionComponent = () => {
  const { store, dispatch } = useContext(FoodRecipeContext);
  const [foodRecipes, setFoodRecipes] = useState(store.foodRecipeList);
  const [isLoggedIn, setLogin] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      if (await getUserInfo()) setLoginState(true, dispatch);
      else setLoginState(false, dispatch);
    }
    
    getUser();
    getFoodRecipeList(dispatch);
  }, [dispatch]);

  useEffect(() => {
    setLogin(store.isLoggedIn);
  }, [store.isLoggedIn]);

  useEffect(() => {
    setFoodRecipes(store.foodRecipeList);
  }, [store.foodRecipeList]);

  useEffect(() => {
    if (store.searchKeyword === '') getFoodRecipeList(dispatch);
    else searchFoodRecipe(store.searchKeyword, dispatch)
  }, [store.searchKeyword, dispatch]);

  return (
    <Container>
      {foodRecipes.map((foodRecipe, key) => {
        return (
          <FoodRecipeCard key={key} foodRecipe={foodRecipe} isLoggedIn={isLoggedIn} />
        )
      })}
    </Container>
  )
}

export default FoodRecipeList