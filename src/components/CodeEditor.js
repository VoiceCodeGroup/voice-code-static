import React, { Component } from 'react';

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
    const editor = this.refs[`${this.props.id}Editor`].editor;
    editor.session.setUseWorker(false);
    // editor.focus();
    // editor.moveCursorTo(1, 5);
  }

  render() {
    const { mode, val, id } = this.props;
    return (
      <AceEditor
        ref={`${id}Editor`}
        mode={mode}
        theme="tomorrow"
        onChange={() => 'he'}
        value={val}
        name="CodeEditor"
        height="100%"
        width="100%"
      />
    );
  }
}

export default CodeEditor;
