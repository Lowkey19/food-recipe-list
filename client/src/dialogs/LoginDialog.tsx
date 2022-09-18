import { Button, TextField } from '@mui/material';
import { FunctionComponent, ChangeEvent, useState } from 'react';
import styled from 'styled-components';

import { login } from '../api/auth';
import { DialogContainer } from '../components/DialogComponents';

interface Props {
  onClose: () => void;
  onLogin: () => void;
}

const StyledDialogContainer = styled(DialogContainer)`
  width: 500px;
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

const ActionContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
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

const LoginDialog: FunctionComponent<Props> = ({ onClose, onLogin }) => {
  const [isLoginError, setIsLoginError] = useState(false);

  const initialState = {
    email: '',
    password: '',
  }

  const [user, setUser] = useState(initialState);

  const handleChange = (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [key]: e.target.value,
    })
  }

  const handleClick = async () => {
    try {
      await login(user);
      onLogin();
      setIsLoginError(false);
      onClose();
    } catch (e) {
      setIsLoginError(true);
    }
  }

  return (
    <StyledDialogContainer title={`Login`} onClose={onClose}>
      <FormContainer>
        <FieldContainer>
          <Label>Email:</Label>
          <StyledTextField placeholder='Input Email' label='Email' value={user?.email} onChange={handleChange('email')} error={isLoginError} helperText={isLoginError ? 'Invalid credentials' : ''}/>
        </FieldContainer>
        <FieldContainer>
          <Label>Password:</Label>
          <StyledTextField type="password" placeholder='Input Password' label='Password' value={user?.password} onChange={handleChange('password')} error={isLoginError} helperText={isLoginError ? 'Invalid credentials' : ''}/>
        </FieldContainer>
      </FormContainer>
      <ActionContainer>
        <StyledButton onClick={onClose}>Cancel</StyledButton>
        <StyledButton onClick={handleClick}>Login</StyledButton>
      </ActionContainer>
    </StyledDialogContainer>
  );
};

export default LoginDialog;
