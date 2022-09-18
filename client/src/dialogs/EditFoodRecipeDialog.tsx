import { Button, TextField } from '@mui/material';
import { FunctionComponent, ChangeEvent, useState, useContext, useEffect } from 'react';
import styled from 'styled-components';

import { getFoodRecipe, updateFoodRecipe } from '../api/foodRecipe';
import { ReactComponent as DeleteImage } from '../assets/deleteImage.svg';
import { DialogContainer } from '../components/DialogComponents';
import ImageUploader from '../components/ImageUploader';
import FoodRecipeContext from '../providers/foodRecipe';

interface Props {
  id: string;
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

const EditFoodRecipeDialog: FunctionComponent<Props> = ({ id, onClose }) => {
  const { store, dispatch } = useContext(FoodRecipeContext);

  useEffect(() => {
    getFoodRecipe(id, dispatch);
  }, [id, dispatch]);

  useEffect(() => {
    setFoodRecipe(store.selectedFoodRecipe);
    if (store.selectedFoodRecipe.ingredients) setCurrentIngredients(store.selectedFoodRecipe.ingredients);
  }, [store.selectedFoodRecipe]);

  const [foodRecipe, setFoodRecipe] = useState(store.selectedFoodRecipe);
  const [currentIngredients, setCurrentIngredients] = useState(['']);

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
    await updateFoodRecipe({ ...foodRecipe, ingredients: currentIngredients }, dispatch);
    onClose();
  }

  return (
    <StyledDialogContainer title={`Edit Food Recipe`} onClose={onClose}>
      <FormContainer>
        <FieldContainer>
          <Label>Name:</Label>
          <StyledTextField placeholder='Input Name' value={foodRecipe.name} onChange={handleChange('name')} />
        </FieldContainer>
        <FieldContainer>
          <Label>Description:</Label>
          <StyledTextField placeholder='Input Description' value={foodRecipe.description} onChange={handleChange('description')} multiline rows={3} />
        </FieldContainer>
        <FieldContainer>
          <Label>Image:</Label>
          <ImageUploader imageUri={foodRecipe.imagePath} onChange={handleUploadImg} />
        </FieldContainer>
        <FieldContainer>
          <Label>Ingredients:</Label>
          <AddButton onClick={handleAddIngredients}>Add Ingredients</AddButton>
          <IngredientsContainer>
            {currentIngredients.map((c, i) => {
              return (
                <TextContainer>
                  <StyledTextField placeholder='Input Ingredients' value={c} onChange={handleIngredientChange(i)}/>
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
          <StyledTextField placeholder='Input Procedure' value={foodRecipe.procedure} onChange={handleChange('procedure')} multiline rows={5} />
        </FieldContainer>
      </FormContainer>
      <ActionContainer>
        <StyledButton onClick={onClose}>Cancel</StyledButton>
        <StyledButton onClick={handleClick}>Edit</StyledButton>
      </ActionContainer>
    </StyledDialogContainer>
  );
};

export default EditFoodRecipeDialog;
