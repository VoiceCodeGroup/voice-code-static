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
    this.EditorModel = new EditorModel(this.updateContext);
  }

  state = {
    compiledCode: '',
    spokenText: 'create element div',
    defaultText: 'create element div',
    context: ['html'],
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

  sendQuery = async (e, query) => {
    const dialogflowResult = await dialogflowAPI(query || this.state.spokenText);
    this.setState({ spokenText: '' });
    await this.EditorModel.performAction(dialogflowResult, this.state.context);
    await this.compile();
  };

  handlePreviewOpen = () => this.setState({ preview: true });

  handlePreviewClose = () => this.setState({ preview: false });

  updateContext = context => {
    console.log('Updating context', context);
    this.setState({ context });
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
          vals={this.EditorModel.getVals()}
          context={this.state.context}
          updateContext={this.updateContext}
          onInputChange={this.onChange}
          sendQuery={this.sendQuery}
          spokenText={this.state.spokenText}
          startSpeechRecognition={this.startSpeechRecognition}
          model={this.EditorModel}
        />
        <PreviewButton onClick={this.handlePreviewOpen} />

        <PreviewModal
          isOpen={this.state.preview}
          handleClose={this.handlePreviewClose}
          codeVals={this.state.compiledCode}
        />
      </PageWrapper>
    );
  }
}
