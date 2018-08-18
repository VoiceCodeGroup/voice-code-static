import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import CodeIcon from '@material-ui/icons/Code';
import PreviewIcon from '@material-ui/icons/Slideshow';

import Suggestion from './Suggestion';

const StyledPreviewButton = styled(Button)`
  && {
    position: fixed;
    bottom: 15px;
    right: 20px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

const PreviewButton = ({ onClick, preview }) => (
  <StyledPreviewButton onClick={onClick} variant="extendedFab" color="secondary">
    <Wrapper>
      {preview ? <CodeIcon /> : <PreviewIcon />}
      <Suggestion text={preview ? '"close"' : '"preview"'} />
    </Wrapper>
  </StyledPreviewButton>
);

export default PreviewButton;
