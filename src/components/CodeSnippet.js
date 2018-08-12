import React from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import CodeEditor from './CodeEditor';

const Wrapper = styled(Paper)`
  width: 720px;
  height: 200px;
  margin: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.p`
  margin: 7px;
`;

export default ({ label, ...other }) => {
  const height = 3;
  return (
    <Wrapper elevation={height}>
      <Label>{label}</Label>
      <CodeEditor {...other} />
    </Wrapper>
  );
};
