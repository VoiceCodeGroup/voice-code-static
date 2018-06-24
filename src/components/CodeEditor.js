import React from 'react';
import styled from 'styled-components';

import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/mode/html';
import 'brace/mode/css';
import 'brace/theme/tomorrow';

const CodeEditor = ({ mode, val }) => (
  <Wrapper>
    <AceEditor
      mode={mode}
      theme="tomorrow"
      onChange={''}
      value={val}
      name="CodeEditor"
      height="100%"
      width="100%"
    />
  </Wrapper>
);

const Wrapper = styled.div`
  width: 31%;
  height: 20rem;
  margin: 15px;
`;

export default CodeEditor;
