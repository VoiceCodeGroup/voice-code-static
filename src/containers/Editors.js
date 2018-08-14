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
import ErrorPopup from '../components/ErrorPopup';
import ConfirmModal from '../components/ConfirmModal';
import HelpButton from '../components/HelpButton';

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
    const callbacks = { updateContext: this.updateContext, handleError: this.handleError };
    this.EditorModel = new EditorModel(callbacks);
  }

  state = {
    compiledCode: '',
    spokenText: 'new div',
    defaultText: 'new div',
    context: ['html'],
    preview: false,
    errorText: null,
    speechConfirmation: false,
    help: false,
    listening: false
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

  toggleListening = () => {
    console.log('current listening state: ' + this.state.listening);
    this.setState(prevState => ({
      listening: !prevState.listening
    }));
    console.log('next listening state: ' + this.state.listening);

    if (this.state.listening) {
      this.startSpeechRecognition();
    } else {
      this.stopSpeechRecognition();
    }
  };

  startSpeechRecognition = () => {
    this.state.SpeechRecognition.start();
    this.setState({ spokenText: '' });
  };

  stopSpeechRecognition = () => {
    // this.state.SpeechRecognition.stop();
  };

  onSpeechResult = async event => {
    const last = event.results.length - 1;
    const spokenText = event.results[last][0].transcript;
    const confidence = event.results[0][0].confidence;
    console.log('Speech:' + spokenText);
    console.log('Confidence: ' + event.results[0][0].confidence);
    if (confidence < 0.9) {
      console.log('Await confirmation');
      this.setState({ speechConfirmation: true, spokenText });
    } else {
      // tts(spokenText);
      await this.setState({ spokenText });
      this.sendQuery();
    }
  };

  sendQuery = async (e, query) => {
    const dialogflowResult = await dialogflowAPI(query || this.state.spokenText);
    this.setState({ spokenText: '' });
    await this.EditorModel.performAction(dialogflowResult, this.state.context);
    // } catch (e) {
    //   console.log(e.stack);
    //   this.handleError('Problem performing action');
    // }
    await this.compile();
  };

  handlePreviewOpen = () => this.setState({ preview: true });

  handlePreviewClose = () => this.setState({ preview: false });

  handleHelpToggle = () => {
    this.setState({ help: !this.state.help });
    console.log('Help toggled to ' + this.state.help);
  };

  handleConfirmationClose = () => this.setState({ speechConfirmation: false, spokenText: '' });

  handleError = errorText => this.setState({ errorText });

  handleErrorClose = () => this.setState({ errorText: null });

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
          toggleListening={this.toggleListening}
          listening={this.state.listening}
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
          help={this.state.help}
        />
        <PreviewButton onClick={this.handlePreviewOpen} />

        <PreviewModal
          isOpen={this.state.preview}
          handleClose={this.handlePreviewClose}
          codeVals={this.state.compiledCode}
        />

        <HelpButton onClick={this.handleHelpToggle} help={this.state.help} />

        <ConfirmModal
          isOpen={this.state.speechConfirmation}
          handleClose={this.handleConfirmationClose}
          title="Is this what you meant to say?"
          spokentText={this.state.spokenText}
          onInputChange={this.onChange}
          sendQuery={this.sendQuery}
          spokenText={this.state.spokenText}
          startSpeechRecognition={this.startSpeechRecognition}
        />

        <ErrorPopup
          message={this.state.errorText}
          open={this.state.errorText !== null}
          closePopup={this.handleErrorClose}
        />
      </PageWrapper>
    );
  }
}
