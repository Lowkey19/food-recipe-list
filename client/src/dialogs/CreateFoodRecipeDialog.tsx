import { Button, TextField } from '@mui/material';
import { FunctionComponent, ChangeEvent, useState, useContext } from 'react';
import styled from 'styled-components';

import { createFoodRecipe } from '../api/foodRecipe';
import { IFoodRecipe } from '../api/foodRecipe/types';
import { ReactComponent as DeleteImage } from '../assets/deleteImage.svg';
import { DialogContainer } from '../components/DialogComponents';
import ImageUploader from '../components/ImageUploader';
import FoodRecipeContext from '../providers/foodRecipe';

interface Props {
  onClose: () => void;
}

const StyledDialogContainer = styled(DialogContainer)`
  width: 800px;
`;

const FormContainer = styled.div``;

const FieldContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Label = styled.label`
  width: 200px;
  margin-right: 50px;
  font-size: 20px;
  font-family: "Roboto","Helvetica","Arial",sans-serif;
  text-align: left;
  display: inline-block;
  position: relative;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  > div {
    border-radius: 10px;
  }
`;

const IngredientsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 66%;
  > div {
    margin-top: 10px;
  }
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
`;

const RemoveIngredient = styled.div`
  cursor: pointer;
  margin: 0 10px;
`;

const ActionContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const AddButton = styled(Button)`
  &&& {
    height: 30px;
    margin-right: 20px;
    color: #002447;
    border: 1px solid gray;
    width: 30%;
  }
`;
  
const StyledButton = styled(Button)`
  &&& {
    height: 30px;
    margin: 0 30px;
    color: #002447;
    background-color: #ffffff;
    font-style: normal;
    font-weight: 400;
  }
`;

const CreateFoodRecipeDialog: FunctionComponent<Props> = ({ onClose }) => {
  const { dispatch } = useContext(FoodRecipeContext);

  const initialState: IFoodRecipe = {
    name: '',
    description: '',
    ingredients: [''],
    procedure: '',
  }

  const [foodRecipe, setFoodRecipe] = useState(initialState);
  const [currentIngredients, setCurrentIngredients] = useState(initialState.ingredients);

  const handleChange = (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setFoodRecipe({
      ...foodRecipe,
      [key]: e.target.value,
    })
  }

  const handleIngredientChange = (idx: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let ingredientsArr = [...currentIngredients];
    ingredientsArr[idx] = value;
    setCurrentIngredients(ingredientsArr);
  }

  const handleUploadImg = (e: { file: File | null }) => {
    const img = e.file;
    if (img !== null) setFoodRecipe({ ...foodRecipe, imageFilename: img });
  };

  const handleAddIngredients = () => {
    setCurrentIngredients([...currentIngredients, '']);
  }

  const handleRemoveIngredient = (idx: number) => (event: React.MouseEvent<HTMLDivElement>) => {
    let ingredientsArr = [...currentIngredients];
    ingredientsArr.splice(idx, 1);
    setCurrentIngredients(ingredientsArr);
  }

  const handleClick = async () => {
    await createFoodRecipe({ ...foodRecipe, ingredients: currentIngredients, isLiked: false }, dispatch);
    onClose();
  }

  return (
    <StyledDialogContainer title={`Create Food Recipe`} onClose={onClose}>
      <FormContainer>
        <FieldContainer>
          <Label>Name:</Label>
          <StyledTextField placeholder='Input Name' label='Name' value={foodRecipe.name} onChange={handleChange('name')} />
        </FieldContainer>
        <FieldContainer>
          <Label>Description:</Label>
          <StyledTextField placeholder='Input Description' label='Description' value={foodRecipe.description} onChange={handleChange('description')} multiline rows={3} />
        </FieldContainer>
        <FieldContainer>
          <Label>Image:</Label>
          <ImageUploader label='Add Image' onChange={handleUploadImg} />
        </FieldContainer>
        <FieldContainer>
          <Label>Ingredients:</Label>
          <AddButton onClick={handleAddIngredients}>Add Ingredients</AddButton>
          <IngredientsContainer>
            {currentIngredients.map((c, i) => {
              return (
                <TextContainer>
                  <StyledTextField placeholder='Input Ingredients' label='Ingredients' value={c} onChange={handleIngredientChange(i)}/>
                  <RemoveIngredient onClick={handleRemoveIngredient(i)}>
                    <DeleteImage />
                  </RemoveIngredient>
                </TextContainer>
              )
            })}
          </IngredientsContainer>
        </FieldContainer>
        <FieldContainer>
          <Label>Procedure:</Label>
          <StyledTextField placeholder='Input Procedure' label='Procedure' value={foodRecipe.procedure} onChange={handleChange('procedure')} multiline rows={5} />
        </FieldContainer>
      </FormContainer>
      <ActionContainer>
        <StyledButton onClick={onClose}>Cancel</StyledButton>
        <StyledButton onClick={handleClick}>Create</StyledButton>
      </ActionContainer>
    </StyledDialogContainer>
  );
};

export default CreateFoodRecipeDialog;
