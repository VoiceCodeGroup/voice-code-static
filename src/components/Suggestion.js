import React from 'react';
import styled from 'styled-components';
import SpeechIcon from '@material-ui/icons/ChatBubble';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 11px;
  margin: 0 5px;
`;

export default ({ text, fontSize }) => {
  return (
    <Wrapper>
      <SpeechIcon style={{ fontSize: 14, marginRight: 5 }} />
      <p style={{ margin: 0, fontSize: fontSize || 11 }}>{text}</p>
    </Wrapper>
  );
};
