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
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  state = {
    code: `//var x = window.document.createElement('div');
//x.style.backgroundColor = 'red';
//x.style.width = '100px';
//x.style.height = '100px';
//document.body.append(x);
\n
//var x equals window dot document dot create element div
//x dot style dot background colour equals red
//x dot style dot width equals 100px
//x dot style dot height equals 100px
//document dot body dot append x;`,
    execute: false,
    spokenText: 'document dot body dot append x',
    defaultText: 'document dot body dot append x',
    queryResponse: ''
  };

  componentDidMount() {
    this.setState({ SpeechRecognition: new speechRecognition(this.onSpeechResult) });
  }

  onEditorChange = val => {
    console.log(val);
    this.setState({ code: val });
  };

  handleChange = value => {
    this.setState({spokenText: value});
  }

  getCodeFunction = func => {
    this.setState({ executeCode: func });
  };

  insertCode = responseText => {
    this.setState({ code: `${this.state.code}\n${responseText}` });
  };

  onClick = () => {
    if (this.state.executeCode) {
      this.state.executeCode(this.state.code);
    }
  };

  sendQuery = () => {
    (async () => {
      console.log(JSON.stringify({text: this.state.spokenText}));
      const rawResponse = await fetch('http://localhost:3000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({text: this.state.spokenText})
      });
      const content = await rawResponse.json();
      const response = content.response;
      console.log(content);
      this.setState({queryResponse: response});
      this.insertCode(response);
    })();
  }

  onSpeechResult = event => {
    const last = event.results.length - 1;
    const spokenText = event.results[last][0].transcript;
    this.setState({ spokenText });
    this.sendQuery();
    tts(spokenText);
  };
  onBlur = event => {
    this.setState({spokenText: event.target.value});
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

          <br/>
          <label for="query">Query: </label>
          {/* <textarea id="query" name = "query" value={this.state.defaultText} onChange={this.handleChange}/> */}
          <input type ="text" size="50" onBlur={this.onBlur.bind(this)}/>
          <button onClick={this.sendQuery}>
            Send Query
          </button>
          <br/>
          <label for="response">Response: </label>
          <input id="response" size="50" name = "response" value={this.state.queryResponse} readonly/>
        </Wrapper>
        <Wrapper>
          <Frame getExecute={this.getCodeFunction} />
        </Wrapper>
      </PageWrapper>
    );
  }
}
