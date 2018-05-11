import React, { Component } from 'react';
import styled from 'styled-components';
import CodeEditor from '../components/CodeEditor';
import Frame from '../components/Frame';
import speechRecognition from '../util/speechRecognition';
import tts from '../util/textToSpeech';

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  background: ${props => (props.left ? '#dedede' : 'white')};
  display: flex;
  flex-direction: column;
  width: 50%;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default class extends Component {
  state = { code: '', execute: false, spokenText: '' };

  componentDidMount() {
    this.setState({ SpeechRecognition: new speechRecognition(this.onSpeechResult) });
  }

  onEditorChange = val => {
    console.log(val);
    this.setState({ code: val });
  };

  getCodeFunction = func => {
    this.setState({ executeCode: func });
  };

  insertSpeech = speechText => {
    this.setState({ code: `${this.state.code}${speechText}` });
  };

  onClick = () => {
    if (this.state.executeCode) {
      this.state.executeCode(this.state.code);
    }
  };

  onSpeechResult = event => {
    const last = event.results.length - 1;
    const spokenText = event.results[last][0].transcript;
    this.setState({ spokenText });
    this.insertSpeech(spokenText);
    tts(spokenText);
  };

  render() {
    console.log(this.state.code);
    return (
      <PageWrapper>
        <Wrapper left>
          <CodeEditor val={this.state.code} onChange={this.onEditorChange} />
          <button onClick={this.onClick}>Execute</button>
          <button
            onClick={() => {
              this.state.SpeechRecognition.start();
              this.setState({ spokenText: '' });
            }}
          >
            Speech Recognition
          </button>
        </Wrapper>
        <Wrapper>
          <Frame getExecute={this.getCodeFunction} />
        </Wrapper>
      </PageWrapper>
    );
  }
}
