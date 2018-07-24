import React from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import CodeEditor from './CodeEditor';

const Wrapper = styled(Paper)`
  width: 31%;
  height: 80vh;
  margin: 12px;
  border: ${props => (props.inFocus ? '2px solid #33dddd' : '')};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.p`
  margin: 7px;
`;

export default ({ inFocus, label, ...other }) => {
  const height = inFocus ? 15 : 2;
  return (
    <Wrapper elevation={height} inFocus={inFocus}>
      <Label>{label}</Label>
      <CodeEditor {...other} />
    </Wrapper>
  );
};
