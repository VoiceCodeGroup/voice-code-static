import React, { Component } from 'react';
import CodeEditor from '../CodeEditor';

class JSEditor extends Component {
  handleClose = () => {
    this.state.open = false;
  };

  render() {
    return (
      <React.Fragment>
        <CodeEditor mode="js" val={this.props.val} inFocus={this.props.inFocus} />
      </React.Fragment>
    );
  }
}

export default JSEditor;
