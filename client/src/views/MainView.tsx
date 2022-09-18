import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from '@reach/router';

import FoodRecipeList from '../components/FoodRecipeList';
import Header from '../components/Header';

const MainView: FunctionComponent<RouteComponentProps> = () => {

  return (
    <>
      <Header />
      <FoodRecipeList />
    </>
  );
};

export default MainView;