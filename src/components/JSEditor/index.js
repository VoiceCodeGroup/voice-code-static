import React, { Component } from 'react';
import EditorPanel from '../EditorPanel';
import HelpPanel from '../HelpPanel';

class JSEditor extends Component {
  handleClose = () => {
    this.state.open = false;
  };

  render() {
    if(this.props.help){
      return(
        <HelpPanel
        mode="js"
        label="JavaScript"
        inFocus={this.props.inFocus}
        />
      );
    }else{
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
}

export default JSEditor;
