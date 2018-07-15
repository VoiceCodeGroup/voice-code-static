import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import PreviewIcon from '@material-ui/icons/Slideshow';

const StyledPreviewButton = styled(Button)`
  && {
    position: fixed;
    bottom: 15px;
    right: 20px;
  }
`;

const PreviewButton = ({ onClick }) => (
  <StyledPreviewButton onClick={onClick} variant="fab" color="secondary">
    <PreviewIcon />
  </StyledPreviewButton>
);

export default PreviewButton;
