import { Dispatch, useReducer } from 'react';
import omit from 'lodash.omit';

import { api } from '../../helpers/api';
import { defaultState } from '../../providers/foodRecipe';
import { foodRecipe } from './reducers';
import { Actions, IFoodRecipe, FoodRecipeState, FoodRecipeTypes } from './types';

const initialState: FoodRecipeState = defaultState.store;

export const useFoodRecipe = (): [FoodRecipeState, Dispatch<FoodRecipeTypes>] => {
  const [state, dispatch] = useReducer(foodRecipe, initialState);
  return [state, dispatch];
}

export async function getFoodRecipeList(dispatch: Dispatch<FoodRecipeTypes>): Promise<void> {
  dispatch({ type: Actions.GET_FOOD_RECIPES_START, payload: undefined });
  try {
    const { data } = await api({
      url: '/foodrecipe',
      method: 'get',
    });

    dispatch({ type: Actions.GET_FOOD_RECIPES_FULFILLED, payload: data });
  } catch (e) {
    dispatch({ type: Actions.GET_FOOD_RECIPES_REJECTED, payload: undefined });
  }
}

export async function getFoodRecipe(id: string, dispatch: Dispatch<FoodRecipeTypes>): Promise<void> {
  dispatch({ type: Actions.GET_FOOD_RECIPE_BY_ID_START, payload: id });
  try {
    const { data } = await api({
      url: `/foodrecipe/${id}`,  
      method: 'get',
      withCredentials: true,
    });

    dispatch({ type: Actions.GET_FOOD_RECIPE_BY_ID_FULFILLED, payload: data });
  } catch (e) {
    dispatch({ type: Actions.GET_FOOD_RECIPE_BY_ID_REJECTED, payload: undefined });
  }
}

export async function createFoodRecipe(params: IFoodRecipe, dispatch: Dispatch<FoodRecipeTypes>): Promise<void> {
  dispatch({ type: Actions.CREATE_FOOD_RECIPE_START, payload: params });
  const formData = new FormData();
  if (params.imageFilename) formData.append('foodImg', params.imageFilename);
  const json = JSON.stringify(
    omit(
      params,
      'id',
      'imagePath',
      'imageFilename',
    )
  );
  formData.append('foodRecipe', json);
  try {
    await api({
      url: `/foodrecipe/create`,  
      method: 'post',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true,
    });

    dispatch({ type: Actions.CREATE_FOOD_RECIPE_FULFILLED, payload: params });
    await getFoodRecipeList(dispatch);
  } catch (e) {
    dispatch({ type: Actions.CREATE_FOOD_RECIPE_REJECTED, payload: undefined });
  }
}

export async function updateFoodRecipe(params: IFoodRecipe, dispatch: Dispatch<FoodRecipeTypes>): Promise<void> {
  dispatch({ type: Actions.UPDATE_FOOD_RECIPE_START, payload: params });
  const { _id } = params;
  const updatedFoodRecipe = omit(params,
    '_id',
    'imagePath',
    'imageFilename',
    'createdAt',
    'updatedAt',
    '__v',
  );
  try {
    await api({
      url: `/foodrecipe/${_id}`,  
      method: 'patch',
      data: { updatedFoodRecipe },
      withCredentials: true,
    });

    dispatch({ type: Actions.UPDATE_FOOD_RECIPE_FULFILLED, payload: params });
    await getFoodRecipeList(dispatch);
  } catch (e) {
    dispatch({ type: Actions.UPDATE_FOOD_RECIPE_REJECTED, payload: undefined });
  }
}

export async function deleteFoodRecipe(id: string, dispatch: Dispatch<FoodRecipeTypes>): Promise<void> {
  dispatch({ type: Actions.DELETE_FOOD_RECIPE_START, payload: id });
  try {
    await api({
      url: `/foodrecipe/${id}`,  
      method: 'delete',
      withCredentials: true,
    });

    dispatch({ type: Actions.DELETE_FOOD_RECIPE_FULFILLED, payload: id });
  } catch (e) {
    dispatch({ type: Actions.DELETE_FOOD_RECIPE_REJECTED, payload: undefined });
  }
}

export async function searchFoodRecipe(s: string, dispatch: Dispatch<FoodRecipeTypes>): Promise<void> {
  dispatch({ type: Actions.SEARCH_FOOD_RECIPES_START, payload: s });
  try {
    const { data } = await api({
      url: `/foodrecipe/search/${s}`,
      method: 'get',
    });
    
    dispatch({ type: Actions.SEARCH_FOOD_RECIPES_FULFILLED, payload: data });
  } catch (e) {
    dispatch({ type: Actions.SEARCH_FOOD_RECIPES_REJECTED, payload: undefined });
  }
}

export function assignSearchKeyWord(s: string, dispatch: Dispatch<FoodRecipeTypes>): void {
  dispatch({ type: Actions.ASSIGN_SEARCH_KEY_WORD_ACTION, payload: s });
}

export function setLoginState(param: boolean, dispatch: Dispatch<FoodRecipeTypes>): void {
  dispatch({ type: Actions.SET_LOGIN_STATE_ACTION, payload: param });
}