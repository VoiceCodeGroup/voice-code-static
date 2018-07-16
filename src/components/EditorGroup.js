import React, { Component } from 'react';
import styled from 'styled-components';
import CodeEditor from './CodeEditor';
import HTMLEditor from './HTMLEditor';

const Wrapper = styled.div`
  display: flex;
  vertical-align: top;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;
  margin-bottom: 30px;
  margin-top: 75px;
`;

export default class EditorGroup extends Component {
  render() {
    const { html, css, js } = this.props.vals;
    return (
      <Wrapper>
        <HTMLEditor inFocus={this.props.mode === 'html'} />
        <CodeEditor val={css} mode={'css'} inFocus={this.props.mode === 'css'} />
        <CodeEditor val={js} mode={'javascript'} inFocus={this.props.mode === 'js'} />
      </Wrapper>
    );
  }
}
