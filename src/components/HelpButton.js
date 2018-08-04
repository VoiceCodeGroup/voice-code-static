import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import PreviewIcon from '@material-ui/icons/Help';

const StyledPreviewButton = styled(Button)`
  && {
    position: fixed;
    bottom: 15px;
    left: 20px;
    z-index: 5;
  }
`;

const PreviewButton = ({ onClick }) => (
  <StyledPreviewButton onClick={onClick} variant="fab" color="secondary">
    <PreviewIcon />
  </StyledPreviewButton>
);

export default PreviewButton;
