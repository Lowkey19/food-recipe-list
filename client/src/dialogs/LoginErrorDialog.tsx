import { Button } from '@mui/material';
import { FunctionComponent } from 'react';
import styled from 'styled-components';

import DeleteIcon from '../assets/deleteIcon.png';
import { DialogContainer } from '../components/DialogComponents';

interface Props {
  onClose: () => void;
}

const StyledDialogContainer = styled(DialogContainer)`
  width: 500px;
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: auto;
  margin-bottom: 20px;
`;

const StyledImg = styled.img`
  margin-left: 30px;
  margin-right: 30px;
`;

const StyledSpan = styled.span`
  margin: auto;
  margin-left: 0px;
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

const LoginErrorDialog: FunctionComponent<Props> = ({ onClose }) => {
  return (
    <StyledDialogContainer title={`Login Error`} onClose={onClose}>
      <TextContainer>
        <StyledImg src={DeleteIcon} />
        <StyledSpan id="alert-dialog-description">
          Invalid Credentials!
        </StyledSpan>
      </TextContainer>
      <ActionContainer>
        <StyledButton onClick={onClose}>Ok</StyledButton>
      </ActionContainer>
    </StyledDialogContainer>
  );
};

export default LoginErrorDialog;
