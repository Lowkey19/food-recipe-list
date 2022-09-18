import { Dispatch, createContext } from 'react';
import { IFoodRecipe, FoodRecipeState, FoodRecipeTypes } from '../api/foodRecipe/types'

interface IFoodRecipeContext {
  store: FoodRecipeState;
  dispatch: Dispatch<FoodRecipeTypes>;
}

export const defaultState: IFoodRecipeContext = {
  store: {
    foodRecipeList: [],
    selectedFoodRecipe: {
      name: '',
      description: '',
      imagePath: '',
      ingredients: [''],
      procedure: '',
    } as IFoodRecipe,
    isLoading: false,
    searchKeyword: '',
    isLoggedIn: false,
  },
  dispatch: (tvShow: FoodRecipeTypes): void => {},
}

const FoodRecipeContext = createContext(defaultState);

export default FoodRecipeContext;