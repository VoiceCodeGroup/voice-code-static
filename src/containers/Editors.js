import React, { Component } from 'react';
import styled from 'styled-components';
import speechRecognition from '../util/speechRecognition';
import tts from '../util/textToSpeech';
import dialogflowAPI, { init } from '../util/dialogflowAPI';

import AppBar from '../components/AppBar';
import EditorGroup from '../components/EditorGroup';
import PreviewButton from '../components/PreviewButton';
import PreviewModal from '../components/PreviewModal';
import EditorModel from '../model/EditorModel';
import ContextDialogGroup from '../components/ContextDialogGroup';

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
  EditorModel = new EditorModel();

  state = {
    compiledCode: '',
    spokenText: 'create element div',
    defaultText: 'create element div',
    context: '',
    preview: false
  };

  componentDidMount() {
    this.setState({ SpeechRecognition: new speechRecognition(this.onSpeechResult) });
    init();
  }

  compile = () => {
    const { html, css, js } = this.EditorModel.getVals();
    this.setState({
      compiledCode: { html, css, js }
    });
  };

  sendQuery = async () => {
    const dialogflowResult = await dialogflowAPI(this.state.spokenText, this.EditorModel.getMode());
    await this.EditorModel.performAction(dialogflowResult, this.openContext);
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

  handlePreviewOpen = () => this.setState({ preview: true });

  handlePreviewClose = () => this.setState({ preview: false });

  openContext = context => {
    this.setState({ context });
  };

  closeContext = () => {
    this.setState({ context: '' });
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
        <EditorGroup vals={this.EditorModel.getVals()} mode={this.EditorModel.getMode()} />
        <PreviewButton onClick={this.handlePreviewOpen} />

        <ContextDialogGroup context={this.state.context} handleClose={this.closeContext} />
        <PreviewModal
          isOpen={this.state.preview}
          handleClose={this.handlePreviewClose}
          codeVals={this.state.compiledCode}
        />
      </PageWrapper>
    );
  }
}
