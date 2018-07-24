import React, { Component } from 'react';
import EditorPanel from '../EditorPanel';

class JSEditor extends Component {
  handleClose = () => {
    this.state.open = false;
  };

  render() {
    return (
      <React.Fragment>
        <EditorPanel
          mode="js"
          id="js"
          label="JavaScript"
          val={this.props.val}
          inFocus={this.props.inFocus}
        />
      </React.Fragment>
    );
  }
}

export default JSEditor;
