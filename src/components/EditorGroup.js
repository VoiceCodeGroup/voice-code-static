import React, { Component } from 'react';
import styled from 'styled-components';
import CodeEditor from '../components/CodeEditor';

const Wrapper = styled.div`
  background: #aedede;
  display: flex;
  vertical-align: top;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export default class EditorGroup extends Component {
  render() {
    console.log(this.props.vals);
    const { html, css, js } = this.props.vals;
    return (
      <Wrapper>
        <CodeEditor val={html} mode={'html'} />
        <CodeEditor val={css} mode={'css'} />
        <CodeEditor val={js} mode={'javascript'} />
      </Wrapper>
    );
  }
}
