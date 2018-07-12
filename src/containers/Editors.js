import React, { Component } from 'react';
import styled from 'styled-components';
import EditorGroup from '../components/EditorGroup';
import Frame from '../components/Frame';
import speechRecognition from '../util/speechRecognition';
import tts from '../util/textToSpeech';
import EditorModel from '../model/EditorModel';
import dialogflowAPI, { init } from '../util/dialogflowAPI';
import Button from '../components/Button';

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

const Wrapper = styled.div`
  background: ${props => (props.left ? '#dedede' : 'white')};
  vertical-align: top;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0.75em 0 0 0;
  height: 50vh;
`;

const EditWrapper = styled.div`
  display: inline-block;
  width: 31%;
  height: 20rem;
  margin: 15px;
  vertical-align: top;
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
    queryResponse: '',
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
        <EditorGroup
          updateCode={this.onEditorChange}
          vals={this.EditorModel.getVals()}
          mode={this.EditorModel.getMode()}
        />

        <Wrapper>
          <Button
            onClick={() => {
              this.state.SpeechRecognition.start();
              this.setState({ spokenText: '' });
            }}
          >
            Speech Recognition
          </Button>
          <br />
          <label>Query: </label>
          <input
            id="query"
            type="text"
            size="50"
            value={this.state.spokenText}
            onChange={this.onChange}
            onBlur={this.onBlur.bind(this)}
          />
          <Button onClick={this.sendQuery}>Send Query</Button>
          <br />
          <label>Response: </label>
          <input
            id="response"
            size="50"
            name="response"
            value={this.state.queryResponse}
            readOnly
          />
          <Frame content={this.state.compiledCode} getExecute={this.getCodeFunction} />
        </Wrapper>
      </PageWrapper>
    );
  }
}
