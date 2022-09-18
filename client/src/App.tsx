import React from 'react';
import { Router } from '@reach/router';

import { useFoodRecipe } from './api/foodRecipe';
import FoodRecipeContext from './providers/foodRecipe';
import DialogProvider from './providers/DialogProvider';
import FoodRecipeView from './views/FoodRecipeView';
import MainView from './views/MainView';

function App() {
  const [foodRecipe, foodRecipeDispatch] = useFoodRecipe();

  return (
    <FoodRecipeContext.Provider value={{ store: { ...foodRecipe }, dispatch: foodRecipeDispatch }}>
      <DialogProvider>
        <Router basepath="/">
          <MainView path="/" />
          <FoodRecipeView path="/:id" />
        </Router>
      </DialogProvider>
    </FoodRecipeContext.Provider>
  );
}

export default App;
