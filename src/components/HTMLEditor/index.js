import React, { Component } from 'react';
import CodeEditor from '../CodeEditor';
import CreateElementDialog from './CreateElementDialog';

class HTMLEditor extends Component {
  handleClose = () => {
    this.props.updateContext(['html']);
  };

  render() {
    return (
      <React.Fragment>
        <CodeEditor mode="html" val={this.props.val} inFocus={this.props.inFocus} />
        <CreateElementDialog
          isOpen={this.props.context[1] === 'createElement'}
          handleClose={this.handleClose}
          context={'Create Element Steve'}
        />
      </React.Fragment>
    );
  }
}

export default HTMLEditor;
