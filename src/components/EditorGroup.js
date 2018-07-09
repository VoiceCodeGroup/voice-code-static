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
    const { html, css, js } = this.props.vals;
    return (
      <Wrapper>
        <CodeEditor val={html} mode={'html'} inFocus={this.props.mode === 'html'} />
        <CodeEditor val={css} mode={'css'} inFocus={this.props.mode === 'css'} />
        <CodeEditor val={js} mode={'javascript'} inFocus={this.props.mode === 'js'} />
      </Wrapper>
    );
  }
}
