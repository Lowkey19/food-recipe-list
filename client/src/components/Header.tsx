import { Button, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { getUserInfo } from '../api/auth';
import { assignSearchKeyWord, setLoginState } from '../api/foodRecipe';
import CreateFoodRecipeDialog from '../dialogs/CreateFoodRecipeDialog';
import LoginDialog from '../dialogs/LoginDialog';
import { useDialog } from '../providers/DialogProvider';
import FoodRecipeContext from '../providers/foodRecipe';

import SearchField from './SearchField';
import ProfileCard from './ProfileCard';

const Container = styled.div`
  display: flex;
  height: 64px;
  width: 100%;
  background-color: #002447;
  justify-content: space-between;
  align-items: center;
  min-width: 780px;
`;

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  > p {
    color: white;
    margin: 0 30px;
    font-size: 25px;
  }
  > svg:first-of-type {
    margin-left: 28px;
    cursor: pointer;
    color: #fafafa;
    font-size: 2rem;
  }
`;

const StyledButton = styled(Button)`
  &&& {
    height: 30px;
    margin: 0 15px;
    color: #002447;
    background-color: #ffffff;
    font-style: normal;
    font-weight: 400;
  }
`;

const StyledAccountButton = styled(AccountCircleIcon)`
  margin: 0 25px;
  color: #fafafa;
  cursor: pointer;
`;

const Header: FunctionComponent = () => {
  const { store, dispatch } = useContext(FoodRecipeContext);
  const [openDialog, closeDialog] = useDialog();
  const [isLoggedIn, setLogin] = useState(false);

  const handleLogin = () => {
    openDialog({
      children: <LoginDialog onClose={closeDialog} onLogin={loginUser} />,
    });
  };

  const handleCreate = () => {
    openDialog({
      children: <CreateFoodRecipeDialog onClose={closeDialog} />,
    });
  };

  const handleSearch = (s: string) => {
    assignSearchKeyWord(s, dispatch);
  }

  useEffect(() => {
    const getUser = async () => {
      if (await getUserInfo()) setLoginState(true, dispatch);
      else setLoginState(false, dispatch);
    }
    
    getUser();
  }, [dispatch]);

  useEffect(() => {
    setLogin(store.isLoggedIn);
  }, [store.isLoggedIn]);

  const loginUser = () => {
    setLoginState(true, dispatch);
  }

  const handleLogout = () => {
    setLoginState(false, dispatch);
  };

  return (
    <Container>
      <MenuContainer>
        <Typography>Food Recipes</Typography>
        <SearchField onSearch={handleSearch} />
        {isLoggedIn && <StyledButton onClick={handleCreate}>Create</StyledButton>}
      </MenuContainer>
      {isLoggedIn ? <ProfileCard icon={<StyledAccountButton />} onLogout={handleLogout} /> : <StyledButton onClick={handleLogin}>Login</StyledButton>}
    </Container>
  );
};

export default Header;
