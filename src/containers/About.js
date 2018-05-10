import React from 'react';
import styled from 'styled-components';
import CodeEditor from '../components/CodeEditor';

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  background: ${props => (props.left ? '#dedede' : 'white')};
  display: flex;
  width: 50%;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const onChange = (a, b) => {
  console.log(a, b);
};

export default () => {
  return (
    <PageWrapper>
      <Wrapper left>
        <CodeEditor />
      </Wrapper>
      <Wrapper>
        <divCodeEditor />
      </Wrapper>
    </PageWrapper>
  );
};
