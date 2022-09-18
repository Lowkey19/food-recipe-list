import { Dialog } from '@mui/material';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

type ProviderContext = readonly [(option: DialogOption) => void, () => void];

const EMPTY_FUNC = () => {};
const DialogContext = React.createContext<ProviderContext>([EMPTY_FUNC, EMPTY_FUNC]);
export const useDialog = (): ProviderContext => React.useContext(DialogContext);

type DialogParams = {
  children: React.ReactNode;
  open: boolean;
  onClose?: () => void;
  onExited?: () => void;
};
type DialogOption = Omit<DialogParams, 'open'>;
type DialogContainerProps = DialogParams & {
  onClose: () => void;
  onKill: () => void;
};

function DialogContainer(props: DialogContainerProps) {
  const { children, open, onClose, onKill, ...others } = props;

  return (
    <Dialog open={open} onClose={onClose} onExited={onKill} {...others}>
      {children}
    </Dialog>
  );
}

type DialogProps = {
  children: React.ReactNode;
  onClose?: () => void;
};

const StyledDialogContainer = styled(DialogContainer)`
  .MuiPaper-root {
    min-width: 300px;
    max-width: 70vw;
  }
`;

export const DialogProvider: FunctionComponent<DialogProps> = (props: DialogProps) => {
  const { children, onClose: onCloseProp } = props;
  const [dialogs, setDialogs] = React.useState<DialogParams[]>([]);
  const createDialog = (option: DialogOption) => {
    const dialog = { ...option, open: true };
    setDialogs((ds) => [...ds, dialog]);
  };
  const closeDialog = () => {
    if (onCloseProp) onCloseProp();

    setDialogs((ds) => {
      const latestDialog = ds.pop();
      if (!latestDialog) return ds;
      if (latestDialog.onClose) latestDialog.onClose();
      return [...ds].concat({ ...latestDialog, open: false });
    });
  };
  const contextValue = React.useRef([createDialog, closeDialog] as const);

  return (
    <DialogContext.Provider value={contextValue.current}>
      {children}
      {dialogs.map((dialog, i) => {
        const { onClose, ...dialogParams } = dialog;
        const handleKill = () => {
          if (dialog.onExited) dialog.onExited();
          setDialogs((ds) => ds.slice(0, ds.length - 1));
        };

        return <StyledDialogContainer key={i} onClose={closeDialog} onKill={handleKill} {...dialogParams} />;
      })}
    </DialogContext.Provider>
  );
};

export default DialogProvider;
