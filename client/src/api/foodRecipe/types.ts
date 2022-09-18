export interface Action<T, P extends unknown = undefined> {
  payload: P extends infer Q ? Q : undefined;
  type: T;
}

export enum Actions {
  GET_FOOD_RECIPES_START = "@foodRecipe/GET_FOOD_RECIPES_START",
  GET_FOOD_RECIPES_FULFILLED = "@foodRecipe/GET_FOOD_RECIPES_FULFILLED",
  GET_FOOD_RECIPES_REJECTED = "@foodRecipe/GET_FOOD_RECIPES_REJECTED",
  CREATE_FOOD_RECIPE_START = "@foodRecipe/CREATE_FOOD_RECIPE_START",
  CREATE_FOOD_RECIPE_FULFILLED = "@foodRecipe/CREATE_FOOD_RECIPE_FULFILLED",
  CREATE_FOOD_RECIPE_REJECTED = "@foodRecipe/CREATE_FOOD_RECIPE_REJECTED",
  UPDATE_FOOD_RECIPE_START = "@foodRecipe/UPDATE_FOOD_RECIPE_START",
  UPDATE_FOOD_RECIPE_FULFILLED = "@foodRecipe/UPDATE_FOOD_RECIPE_FULFILLED",
  UPDATE_FOOD_RECIPE_REJECTED = "@foodRecipe/UPDATE_FOOD_RECIPE_REJECTED",
  DELETE_FOOD_RECIPE_START = "@foodRecipe/DELETE_FOOD_RECIPE_START",
  DELETE_FOOD_RECIPE_FULFILLED = "@foodRecipe/DELETE_FOOD_RECIPE_FULFILLED",
  DELETE_FOOD_RECIPE_REJECTED = "@foodRecipe/DELETE_FOOD_RECIPE_REJECTED",
  GET_FOOD_RECIPE_BY_ID_START = "@foodRecipe/GET_FOOD_RECIPE_BY_ID_START",
  GET_FOOD_RECIPE_BY_ID_FULFILLED = "@foodRecipe/GET_FOOD_RECIPE_BY_ID_FULFILLED",
  GET_FOOD_RECIPE_BY_ID_REJECTED = "@foodRecipe/GET_FOOD_RECIPE_BY_ID_REJECTED",
  ASSIGN_SEARCH_KEY_WORD_ACTION = "@foodRecipe/ASSIGN_SEARCH_KEY_WORD_ACTION",
  SEARCH_FOOD_RECIPES_START = "@foodRecipe/SEARCH_FOOD_RECIPES_START",
  SEARCH_FOOD_RECIPES_FULFILLED = "@foodRecipe/SEARCH_FOOD_RECIPES_FULFILLED",
  SEARCH_FOOD_RECIPES_REJECTED = "@foodRecipe/SEARCH_FOOD_RECIPES_REJECTED",
  SET_LOGIN_STATE_ACTION = "@foodRecipe/SET_LOGIN_STATE_ACTION",
}

export interface IFoodRecipe {
  _id?: string;
  name: string;
  description: string;
  imagePath?: string;
  imageFilename?: File;
  ingredients: string[];
  procedure: string;
  isLiked?: boolean;
}

export type FoodRecipeState = {
  foodRecipeList: IFoodRecipe[];
  selectedFoodRecipe: IFoodRecipe;
  isLoading: boolean;
  searchKeyword: string;
  isLoggedIn: boolean;
}

type GetFoodRecipesRequest = Action<typeof Actions.GET_FOOD_RECIPES_START>;
type GetFoodRecipesAction = Action<typeof Actions.GET_FOOD_RECIPES_FULFILLED, IFoodRecipe[]>;
type GetFoodRecipesError = Action<typeof Actions.GET_FOOD_RECIPES_REJECTED>;

type GetFoodRecipeByIdRequest = Action<typeof Actions.GET_FOOD_RECIPE_BY_ID_START, string>;
type GetFoodRecipeByIdAction = Action<typeof Actions.GET_FOOD_RECIPE_BY_ID_FULFILLED, IFoodRecipe>;
type GetFoodRecipeByIdError = Action<typeof Actions.GET_FOOD_RECIPE_BY_ID_REJECTED>;

type CreateFoodRecipeRequest = Action<typeof Actions.CREATE_FOOD_RECIPE_START, IFoodRecipe>;
type CreateFoodRecipeAction = Action<typeof Actions.CREATE_FOOD_RECIPE_FULFILLED, IFoodRecipe>;
type CreateFoodRecipeError = Action<typeof Actions.CREATE_FOOD_RECIPE_REJECTED>;

type UpdateFoodRecipeRequest = Action<typeof Actions.UPDATE_FOOD_RECIPE_START, IFoodRecipe>;
type UpdateFoodRecipeAction = Action<typeof Actions.UPDATE_FOOD_RECIPE_FULFILLED, IFoodRecipe>;
type UpdateFoodRecipeError = Action<typeof Actions.UPDATE_FOOD_RECIPE_REJECTED>;

type DeleteFoodRecipeRequest = Action<typeof Actions.DELETE_FOOD_RECIPE_START, string>;
type DeleteFoodRecipeAction = Action<typeof Actions.DELETE_FOOD_RECIPE_FULFILLED, string>;
type DeleteFoodRecipeError = Action<typeof Actions.DELETE_FOOD_RECIPE_REJECTED>;

type AssignSearchKeyWordAction = Action<typeof Actions.ASSIGN_SEARCH_KEY_WORD_ACTION, string>;

type SearchFoodRecipeRequest = Action<typeof Actions.SEARCH_FOOD_RECIPES_START, string>;
type SearchFoodRecipeAction = Action<typeof Actions.SEARCH_FOOD_RECIPES_FULFILLED, IFoodRecipe[]>;
type SearchFoodRecipeError = Action<typeof Actions.SEARCH_FOOD_RECIPES_REJECTED>;

type SetLoginStateAction = Action<typeof Actions.SET_LOGIN_STATE_ACTION, boolean>;

export type FoodRecipeTypes =
  | GetFoodRecipesRequest
  | GetFoodRecipesAction
  | GetFoodRecipesError
  | GetFoodRecipeByIdRequest
  | GetFoodRecipeByIdAction
  | GetFoodRecipeByIdError
  | CreateFoodRecipeRequest
  | CreateFoodRecipeAction
  | CreateFoodRecipeError
  | UpdateFoodRecipeRequest
  | UpdateFoodRecipeAction
  | UpdateFoodRecipeError
  | DeleteFoodRecipeRequest
  | DeleteFoodRecipeAction
  | DeleteFoodRecipeError
  | SearchFoodRecipeRequest
  | SearchFoodRecipeAction
  | SearchFoodRecipeError
  | AssignSearchKeyWordAction
  | SetLoginStateAction;