import { Actions, FoodRecipeState, FoodRecipeTypes } from "./types";

export function foodRecipe(state: FoodRecipeState, action: FoodRecipeTypes): FoodRecipeState {
  switch (action.type) {
    case Actions.GET_FOOD_RECIPES_START: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case Actions.GET_FOOD_RECIPES_FULFILLED: {
      return {
        ...state,
        foodRecipeList: action.payload,
        isLoading: false,
      }
    }
    case Actions.GET_FOOD_RECIPES_REJECTED: {
      return {
        ...state,
        isLoading: false,
      }
    }
    case Actions.GET_FOOD_RECIPE_BY_ID_START: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case Actions.GET_FOOD_RECIPE_BY_ID_FULFILLED: {
      return {
        ...state,
        selectedFoodRecipe: action.payload,
        isLoading: false,
      }
    }
    case Actions.GET_FOOD_RECIPE_BY_ID_REJECTED: {
      return {
        ...state,
        isLoading: false,
      }
    }
    case Actions.CREATE_FOOD_RECIPE_START: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case Actions.CREATE_FOOD_RECIPE_FULFILLED: {
      return {
        ...state,
        foodRecipeList: [...state.foodRecipeList, action.payload],
        isLoading: false,
      }
    }
    case Actions.CREATE_FOOD_RECIPE_REJECTED: {
      return {
        ...state,
        isLoading: false,
      }
    }
    case Actions.UPDATE_FOOD_RECIPE_START: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case Actions.UPDATE_FOOD_RECIPE_FULFILLED: {
      const { _id } = action.payload;
      const idx = state.foodRecipeList.findIndex((obj) => obj._id === _id);
      state.foodRecipeList[idx] = action.payload;
      return {
        ...state,
        foodRecipeList: state.foodRecipeList,
        isLoading: false,
      };
    }
    case Actions.UPDATE_FOOD_RECIPE_REJECTED: {
      return {
        ...state,
        isLoading: false,
      }
    }
    case Actions.DELETE_FOOD_RECIPE_START: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case Actions.DELETE_FOOD_RECIPE_FULFILLED: {
      const idx = state.foodRecipeList.findIndex((obj) => obj._id === action.payload);
      state.foodRecipeList.splice(idx, 1);
      return {
        ...state,
        foodRecipeList: state.foodRecipeList,
        isLoading: false,
      };
    }
    case Actions.DELETE_FOOD_RECIPE_REJECTED: {
      return {
        ...state,
        isLoading: false,
      }
    }
    case Actions.SEARCH_FOOD_RECIPES_START: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case Actions.SEARCH_FOOD_RECIPES_FULFILLED: {
      return {
        ...state,
        foodRecipeList: action.payload,
        isLoading: false,
      }
    }
    case Actions.SEARCH_FOOD_RECIPES_REJECTED: {
      return {
        ...state,
        isLoading: false,
      }
    }
    case Actions.ASSIGN_SEARCH_KEY_WORD_ACTION: {
      return {
        ...state,
        searchKeyword: action.payload,
      }
    }
    case Actions.SET_LOGIN_STATE_ACTION: {
      return {
        ...state,
        isLoggedIn: action.payload,
      }
    }
    default:
      return state;
  }
}