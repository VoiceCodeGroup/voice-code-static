import React, { Component } from 'react';
import styled from 'styled-components';
import CodeEditor from '../components/CodeEditor';
import HTMLEditor from './HTMLEditor';
import CSSEditor from './CSSEditor';
import JSEditor from './JSEditor';

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
    const context = this.props.context;
    return (
      <Wrapper>
        <HTMLEditor val={html} inFocus={context[0] === 'html'} context={context} />
        <CSSEditor val={css} inFocus={context[0] === 'css'} context={context} />
        <JSEditor val={js} inFocus={context[0] === 'js'} context={context} />
      </Wrapper>
    );
  }
}
