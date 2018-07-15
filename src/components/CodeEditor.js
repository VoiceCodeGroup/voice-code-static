import React, { Component } from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';

import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/mode/html';
import 'brace/mode/css';
import 'brace/theme/tomorrow';

class CodeEditor extends Component {
  componentDidMount() {
    this.updateEditor();
  }

  componentDidUpdate() {
    this.updateEditor();
  }

  updateEditor() {
    if (this.props.mode === 'html') {
      const editor = this.refs[`${this.props.mode}Editor`].editor;
      // editor.focus();
      // editor.moveCursorTo(1, 5);
    }
  }

  render() {
    const { mode, val } = this.props;
    const height = this.props.inFocus ? 15 : 2;
    return (
      <Wrapper elevation={height} inFocus={this.props.inFocus}>
        <AceEditor
          ref={`${mode}Editor`}
          mode={mode}
          theme="tomorrow"
          onChange={() => 'he'}
          value={val}
          name="CodeEditor"
          height="100%"
          width="100%"
        />
      </Wrapper>
    );
  }
}

const Wrapper = styled(Paper)`
  width: 31%;
  height: 80vh;
  margin: 12px;
  border: ${props => (props.inFocus ? '2px solid #33dddd' : '')};
`;

export default CodeEditor;
