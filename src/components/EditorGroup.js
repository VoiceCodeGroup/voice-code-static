import React, { Component } from 'react';
import styled from 'styled-components';
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
    const EditorModel = this.props.model;
    const HTMLModel = EditorModel.getHTMLModel();
    const CSSModel = EditorModel.getCSSModel();
    const JSModel = EditorModel.getJSModel();
    const help = this.props.help;
    return (
      <Wrapper>
        <HTMLEditor
          val={html}
          model={HTMLModel}
          inFocus={context[0] === 'html'}
          context={context}
          updateContext={this.props.updateContext}
          onInputChange={this.props.onInputChange}
          sendQuery={this.props.sendQuery}
          spokenText={this.props.spokenText}
          toggleListening={this.props.toggleListening}
          listening={this.props.listening}
          startSpeechRecognition={this.props.startSpeechRecognition}
          help={this.props.help}
        />
        <CSSEditor
          val={css}
          model={CSSModel}
          inFocus={context[0] === 'css'}
          context={context}
          updateContext={this.props.updateContext}
          onInputChange={this.props.onInputChange}
          sendQuery={this.props.sendQuery}
          spokenText={this.props.spokenText}
          toggleListening={this.props.toggleListening}
          listening={this.props.listening}
          startSpeechRecognition={this.props.startSpeechRecognition}
          help={this.props.help}
        />
        <JSEditor
          val={js}
          jsModel={JSModel}
          inFocus={context[0] === 'js'}
          context={context}
          updateContext={this.props.updateContext}
          onInputChange={this.props.onInputChange}
          sendQuery={this.props.sendQuery}
          spokenText={this.props.spokenText}
          toggleListening={this.props.toggleListening}
          listening={this.props.listening}
          startSpeechRecognition={this.props.startSpeechRecognition}
          help={this.props.help}
        />
      </Wrapper>
    );
  }
}
