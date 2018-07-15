import React, { Component } from 'react';
import styled from 'styled-components';
import EditorGroup from '../components/EditorGroup';
import Frame from '../components/Frame';
import speechRecognition from '../util/speechRecognition';
import tts from '../util/textToSpeech';
import EditorModel from '../model/EditorModel';
import dialogflowAPI, { init } from '../util/dialogflowAPI';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import AppBar from '../components/AppBar';

import { edit } from 'brace';

const PageWrapper = styled.div`
  min-height: 100vh;
  width:100%
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default class extends Component {
  constructor(props) {
    super(props);
    this.onEditorChange = this.onEditorChange.bind(this);
    this.EditorModel = new EditorModel();
  }
  state = {
    code: {},
    compiledCode: '',
    execute: false,
    spokenText: 'create element div',
    defaultText: 'create element div',
    currentMode: 'html'
  };

  componentDidMount() {
    this.setState({ SpeechRecognition: new speechRecognition(this.onSpeechResult) });
    init();
  }

  onEditorChange = val => {
    console.log(val);
    this.setState({ code: val });
  };

  compile = () => {
    const { html, css, js } = this.EditorModel.getVals();
    this.setState({
      compiledCode: { html, css, js }
    });
  };

  sendQuery = async () => {
    const dialogflowResult = await dialogflowAPI(this.state.spokenText, this.EditorModel.getMode());
    await this.EditorModel.performAction(dialogflowResult);
    await this.compile();
  };

  onChange = event => {
    this.setState({ spokenText: event.target.value });
  };

  startSpeechRecognition = () => {
    this.state.SpeechRecognition.start();
    this.setState({ spokenText: '' });
  };

  onSpeechResult = async event => {
    const last = event.results.length - 1;
    const spokenText = event.results[last][0].transcript;
    tts(spokenText);
    await this.setState({ spokenText });
    this.sendQuery();
  };

  onBlur = event => {
    this.setState({ spokenText: event.target.value });
  };

  render() {
    return (
      <PageWrapper>
        <AppBar
          sendQuery={this.sendQuery}
          onInputChange={this.onChange}
          spokenText={this.state.spokenText}
          startSpeechRecognition={this.startSpeechRecognition}
        />
        <EditorGroup
          updateCode={this.onEditorChange}
          vals={this.EditorModel.getVals()}
          mode={this.EditorModel.getMode()}
        />
        <Frame content={this.state.compiledCode} getExecute={this.getCodeFunction} />
      </PageWrapper>
    );
  }
}
