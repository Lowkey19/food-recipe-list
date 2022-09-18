import {
  DialogContent as MuiDialogContent,
  DialogTitle as MuiDialogTitle,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import React, { FunctionComponent, ReactNode } from 'react';
import styled from 'styled-components';

const StyledMuiDialogTitle = styled(MuiDialogTitle)`
  margin: 0;
  font-size: 17px;
  max-height: 117px;
  overflow-y: hidden;
  &:hover {
    overflow-y: auto;
  }
  margin: 0;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
`;

const Container = styled.div`
  width: 100%;
  .MuiDialogContent-root {
    padding: 20px;
  }
  > p {
    cursor: pointer;
    padding: 5px;
    border: 1px solid;
    width: 65px;
    text-align: center;
    border-radius: 5px;
    margin-left: 10px;
    margin-bottom: 20px;
  }
`;

const StyledIconButton = styled(IconButton)`
  position: absolute !important;
  right: 8px;
  top: 8px;
`;

const TitleContainer = styled.div`
  font-size: 20px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.3;
  letter-spacing: normal;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export interface DialogTitleProps {
  children: React.ReactNode;
  onClose?: () => void;
}

const DialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;
  return (
    <StyledMuiDialogTitle {...other}>
      <TitleContainer>{children}</TitleContainer>
      {onClose ? (
        <StyledIconButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </StyledIconButton>
      ) : null}
    </StyledMuiDialogTitle>
  );
};

interface DialogContainerProps {
  title: ReactNode;
  children: ReactNode;
  onClose?: () => void;
}

export const DialogContainer: FunctionComponent<DialogContainerProps> = ({ title, children, onClose, ...others }) => {
  return (
    <Container {...others}>
      <DialogTitle onClose={onClose}>{title}</DialogTitle>
      <MuiDialogContent dividers>{children}</MuiDialogContent>
    </Container>
  );
};
