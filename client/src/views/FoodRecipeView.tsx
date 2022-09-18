import React, { FunctionComponent, useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { Link, RouteComponentProps } from '@reach/router';
import { Typography } from '@mui/material';

import { getFoodRecipe } from '../api/foodRecipe';
import FoodRecipeContext from '../providers/foodRecipe';

const MainContainer = styled.div`
  margin: 20px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px;
`;

const StyledImage = styled.img`
  height: 600px;
`;

const DetailsContainer = styled.div`
  padding: 0 30px;
`;

const Title = styled.div`
  > p {
    font-weight: bold;
    font-size: 36px;
  }
`;

const DescriptionContainer = styled.div`
  font-size: 24px;
  margin: 10px 15px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProcedureContainer = styled.div`
  font-size: 24px;
  margin: 10px 15px;
  white-space: pre-wrap;
`;

interface Props extends RouteComponentProps {
  id?: string;
}

const FoodRecipeView: FunctionComponent<Props> = (props: Props) => {
  const { id } = props;
  const { store, dispatch } = useContext(FoodRecipeContext);
  const [foodRecipe, setFoodRecipe] = useState(store.selectedFoodRecipe);

  useEffect(() => {
    if (id) getFoodRecipe(id, dispatch)
  }, [id, dispatch])

  useEffect(() => {
    setFoodRecipe(store.selectedFoodRecipe);
  }, [store.selectedFoodRecipe])

  return (
    <MainContainer>
      <Link to={`/`}>
        <Typography>Back to home</Typography>
      </Link>
      <Container>
        <StyledImage src={foodRecipe.imagePath} />
        <DetailsContainer>
          <Title>
            <Typography>{foodRecipe.name}</Typography>
          </Title>
          <DescriptionContainer dangerouslySetInnerHTML={{__html: foodRecipe.description}} />
          <Title>
            <Typography>Ingredients</Typography>
          </Title>
          {foodRecipe.ingredients.map((ingredient) => {
            return (
              <DescriptionContainer>{ingredient}</DescriptionContainer>
            )
          })}
          <Title>
            <Typography>Procedure</Typography>
          </Title>
          <ProcedureContainer dangerouslySetInnerHTML={{__html: foodRecipe.procedure}} />
        </DetailsContainer>
      </Container>
    </MainContainer>
  )
}

export default FoodRecipeView;