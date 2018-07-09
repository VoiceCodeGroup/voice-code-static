import React, { Component } from 'react';
import styled from 'styled-components';
import EditorGroup from '../components/EditorGroup';
import Frame from '../components/Frame';
import speechRecognition from '../util/speechRecognition';
import tts from '../util/textToSpeech';
import EditorModel from '../model/EditorModel';
import dialogflowAPI, { init } from '../util/dialogflowAPI';

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
    this.handleChange = this.handleChange.bind(this);
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

  handleChange = value => {
    this.setState({ spokenText: value });
  };

  insertCode = responseText => {
    this.setState({ code: `${this.state.javascriptCode}\n${responseText}` });
  };

  compile = () => {
    const { html, css, js } = this.EditorModel.getVals();
    this.setState({
      compiledCode: `${html}<style>${css}</style><script>${js}</script>`
    });
  };

  onClick = () => {
    if (this.state.executeCode) {
      this.state.executeCode(this.state.javascriptCode);
    }
  };

  sendQuery = async spokenText => {
    const dialogflowResult = await dialogflowAPI(this.state.spokenText, this.EditorModel.getMode());
    await this.EditorModel.performAction(dialogflowResult);

    this.compile();
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
          <button
            onClick={() => {
              this.state.SpeechRecognition.start();
              this.setState({ spokenText: '' });
            }}
          >
            Speech Recognition
          </button>
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
          <button onClick={this.sendQuery}>Send Query</button>
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
