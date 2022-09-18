import React, { FunctionComponent, useContext } from 'react';
import styled from 'styled-components';
import { Typography, Menu, MenuItem } from '@mui/material';
import { Link } from '@reach/router';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { IFoodRecipe } from '../api/foodRecipe/types';
import { deleteFoodRecipe, updateFoodRecipe } from '../api/foodRecipe';
import EditFoodRecipeDialog from '../dialogs/EditFoodRecipeDialog';
import { useDialog } from '../providers/DialogProvider';
import FoodRecipeContext from '../providers/foodRecipe';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 310px;
  width: 520px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin: 20px;
  border-radius: 20px;
`;

const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: right;
  height: 45px;
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  > p {
    font-weight: bold;
    font-size: 24px;
  }
`;

const DetailsContainer = styled.div`
  padding-right: 20px;
`;

const SummaryContainer = styled.div`
  height: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const StyledImage = styled.img`
  height: 200px;
  width: 200px;
  margin: 0 30px;
`;

const FavoriteButton = styled.div`
  > svg {
    padding: 10px;
    cursor: pointer;
  }
`;

const ActionButton = styled.div`
  > svg {
    padding-top: 10px;
    padding-right: 20px;
    cursor: pointer;
  }
`;

interface Props {
  foodRecipe: IFoodRecipe;
  isLoggedIn: boolean;
}

const FoodRecipeCard: FunctionComponent<Props> = ({ foodRecipe, isLoggedIn }) => {
  const { _id, name, description, imagePath, isLiked } = foodRecipe;
  const { dispatch } = useContext(FoodRecipeContext);
  const [openDialog, closeDialog] = useDialog();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleFavorite = async (event: React.MouseEvent<HTMLDivElement>) => {
    await updateFoodRecipe({
      ...foodRecipe,
      isLiked: !isLiked,
    }, dispatch);
  };

  const handleEdit = () => {
    openDialog({
      children: <EditFoodRecipeDialog id={_id || ''} onClose={closeDialog} />,
    });
  };

  const handleDelete = async () => {
    await deleteFoodRecipe(_id || '', dispatch);
  };

  return (
      <Container>
        <HeaderContainer>
          {isLoggedIn && (
            <FavoriteButton onClick={toggleFavorite}>
              {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </FavoriteButton>
          )}
          {isLoggedIn && (
            <div>
              <ActionButton onClick={handleClick}>
                <MoreHorizIcon />
              </ActionButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
              </Menu>
            </div>
          )}
        </HeaderContainer>
        <ContentContainer>
          <StyledImage src={imagePath || ''} />
          <DetailsContainer>
            <Link to={`/${_id}`}>
              <Title>
                <Typography>{name}</Typography>
              </Title>
            </Link>
            <SummaryContainer dangerouslySetInnerHTML={{__html: description}} />
          </DetailsContainer>
        </ContentContainer>
      </Container>
  )
}

export default FoodRecipeCard;