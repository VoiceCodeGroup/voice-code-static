import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import HelpIcon from '@material-ui/icons/Help';
import CodeIcon from '@material-ui/icons/Code';

const StyledPreviewButton = styled(Button)`
  && {
    position: fixed;
    bottom: 15px;
    left: 20px;
    z-index: 5;
  }
`;

const PreviewButton = ({ onClick, help }) => {
  if(help){
    return(
      <StyledPreviewButton onClick={onClick} variant="fab" color="secondary">
      <CodeIcon />
    </StyledPreviewButton>
    );
  }else{
    return(
    <StyledPreviewButton onClick={onClick} variant="fab" color="secondary">
    <HelpIcon />
  </StyledPreviewButton>
    );
  }
};

export default PreviewButton;
