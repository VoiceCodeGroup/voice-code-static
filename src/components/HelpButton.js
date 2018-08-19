import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import HelpIcon from '@material-ui/icons/Help';
import CodeIcon from '@material-ui/icons/Code';
import Suggestion from './Suggestion';

const StyledHelpButton = styled(Button)`
  && {
    position: fixed;
    bottom: 15px;
    left: 20px;
    z-index: 5;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

const HelpButton = ({ onClick, help }) => (
  <StyledHelpButton onClick={onClick} variant="extendedFab" color="secondary">
    <Wrapper>
      {help ? <CodeIcon /> : <HelpIcon />}
      <Suggestion text={help ? 'close' : 'Help'} />
    </Wrapper>
  </StyledHelpButton>
);

export default HelpButton;
