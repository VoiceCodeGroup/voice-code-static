import React, { Component } from 'react';
import styled from 'styled-components';
import CodeEditor from '../components/CodeEditor';

const Wrapper = styled.div`
  background: #aedede;
  display: flex;
  vertical-align: top;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0.75em 0 0 0;
`;

const EditWrapper = styled.div`
  width: 31%;
  height: 20rem;
  margin: 15px;
  vertical-align: top;
  border-style: solid;
  border-radius: 2px;
  border-width: 1px;
`;

export default class EditorGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      htmlCode: ``,
      cssCode: ``,
      javascriptCode: ``,
      code: ''
    };
  }
  compile = () => {
    this.setState({
      code:
        this.state.htmlCode +
        '<style>' +
        this.state.cssCode +
        '</style><script>' +
        this.state.javascriptCode +
        '</script>'
    });
    console.log(this.state.code);
  };

  onChange = (field, value) => {
    this.setState({ [field]: value });
    this.compile();
    this.props.updateCode(this.state.code);
  };

  render() {
    return (
      <Wrapper>
        <EditWrapper>
          <CodeEditor
            val={this.state.htmlCode}
            onChange={this.onChange}
            height={'100%'}
            width={'100%'}
            mode={'html'}
          />
        </EditWrapper>
        <EditWrapper>
          <CodeEditor
            val={this.state.cssCode}
            onChange={this.onChange}
            height={'100%'}
            width={'100%'}
            mode={'css'}
          />
        </EditWrapper>
        <EditWrapper>
          <CodeEditor
            val={this.state.javascriptCode}
            onChange={this.onChange}
            height={'100%'}
            width={'100%'}
            mode={'javascript'}
          />
        </EditWrapper>
      </Wrapper>
    );
  }
}
