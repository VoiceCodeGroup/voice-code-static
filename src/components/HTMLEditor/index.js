import React, { Component } from 'react';
import CodeEditor from '../CodeEditor';
import CreateElementDialog from './CreateElementDialog';

class HTMLEditor extends Component {
  handleClose = () => {
    this.state.open = false;
  };

  render() {
    return (
      <React.Fragment>
        <CodeEditor mode="html" val={this.props.val} inFocus={this.props.inFocus} />
        <CreateElementDialog />
      </React.Fragment>
    );
  }
}

export default HTMLEditor;
