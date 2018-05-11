import React, { Component } from 'react';
import styled from 'styled-components';
import CodeEditor from '../components/CodeEditor';
import Frame from '../components/Frame';

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

export default class extends Component {
  state = { code: '' };

  onEditorChange = val => {
    console.log(val);
    this.setState({ code: val });
  };

  render() {
    return (
      <PageWrapper>
        <Wrapper left>
          <CodeEditor val={this.state.code} onChange={this.onEditorChange} />
        </Wrapper>
        <Wrapper>
          <Frame />
        </Wrapper>
      </PageWrapper>
    );
  }
}
