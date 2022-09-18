import React, { FunctionComponent, useEffect, useState } from 'react';
import styled from 'styled-components';

import { ReactComponent as DeleteImage } from '../assets/deleteImage.svg';
import PlusImageIcon from '../assets/plusImageIcon.svg';

type TUpload = {
  file: File | null;
  name?: string;
};

interface Props {
  label?: string;
  imageUri?: string;
  getImage?: (files: File) => void;
  onChange?: (req: TUpload) => void;
  onDelete?: () => void;
}

const Container = styled.div<{ isPreview?: boolean }>`
  position: relative;
  border: 1px ${({ isPreview }) => (isPreview ? 'solid' : 'dashed')} #c1c1c1;
  width: 70px;
  height: 70px;
  border-radius: 8px;
`;

const DeleteIcon = styled(DeleteImage)`
  position: absolute;
  top: -5px;
  right: -7px;
  cursor: pointer;
  z-index: 1;
`;

const Uploader = styled.input`
  width: 70px;
  height: 70px;
  cursor: pointer;
  box-sizing: border-box;
  padding: 5px;
  opacity: 0;
  position: relative;
  z-index: 1;
`;

const Label = styled.p`
  margin: 0;
  position: absolute;
  z-index: 0;
  bottom: 5px;
  left: 0;
  font-size: 10px;
  width: 100%;
  text-align: center;
  color: #c1c1c1;
  font-weight: 700;
  letter-spacing: 0.1px;
  line-height: 1.6;
`;

const PlusIcon = styled.img`
  position: absolute;
  top: 12px;
  left: 50%;
  margin-left: -15px;
  z-index: 0;
`;

const Diagram = styled.img`
  width: 68.5px;
  height: 68.5px;
  position: absolute;
  left: 0px;
  top: 0;
  border-radius: 7px;
`;

interface State {
  diagram?: File;
  previewImage: string;
}

const ImageUploader: FunctionComponent<Props> = (props: Props) => {
  const { label, imageUri, onChange, onDelete } = props;
  const [diagramState, setDiagram] = useState<State>({ previewImage: imageUri || '' });

  useEffect(() => {
    if (imageUri) setDiagram({ ...diagramState, previewImage: imageUri });
    if (!imageUri) setDiagram({ ...diagramState, previewImage: '' });
  }, [imageUri]);

  const handleUploadDiagram = (event: React.ChangeEvent<HTMLInputElement>) => {
    const theDiagram = event.target.files && event.target.files[0];

    if (theDiagram) {
      setDiagram({ diagram: theDiagram, previewImage: window.URL.createObjectURL(theDiagram) });
    }
    if (typeof onChange === 'function') onChange({ name: theDiagram?.name, file: theDiagram });
  };

  const handleDelete = () => {
    setDiagram({ previewImage: '' });
    if (typeof onDelete === 'function') onDelete();
  };

  const isPreview = diagramState.previewImage !== '';

  return (
    <Container isPreview={isPreview}>
      <Uploader
        type={'file'}
        data-testId="imgInput"
        onChange={handleUploadDiagram}
        accept="image/x-png,image/gif,image/jpeg,image/jpg"
      />
      {diagramState.previewImage && (
        <>
          <Diagram src={diagramState.previewImage} />
          <div data-testid="delete" onClick={handleDelete}>
            <DeleteIcon />
          </div>
        </>
      )}
      {!diagramState.previewImage && (
        <>
          <PlusIcon src={PlusImageIcon} />
          <Label>{label}</Label>
        </>
      )}
    </Container>
  );
};

export default ImageUploader;
