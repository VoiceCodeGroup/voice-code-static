import React, { Component } from 'react';
import styled from 'styled-components';
import EditorGroup from '../components/EditorGroup';
import Frame from '../components/Frame';
import speechRecognition from '../util/speechRecognition';
import tts from '../util/textToSpeech';
import { edit } from 'brace';

const PageWrapper = styled.div`
  min-height: 100vh;
  padding:1rem;
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
  width:100%;   
  margin: 0.75em 0 0 0;
  height:50vh;
  `;

const EditWrapper = styled.div`
    display: inline-block;
    width: 31%;
    height: 20rem;
    margin: 15px;
    vertical-align: top;
`;

export default class extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onEditorChange = this.onEditorChange.bind(this);
  }
  state = {
    code:``,
    execute: false,
    spokenText: '',
    defaultText: '',
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
    this.setState({ code: `${this.state.javascriptCode}\n${responseText}` });
  };

  onClick = () => {
    if (this.state.executeCode) {
      this.state.executeCode(this.state.javascriptCode);
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
    return (
      <PageWrapper>
        <EditorGroup updateCode={this.onEditorChange}/>
        <Wrapper>
          <Frame content={this.state.code} getExecute={this.getCodeFunction} />
        </Wrapper>
      </PageWrapper>
    );
  }
}
