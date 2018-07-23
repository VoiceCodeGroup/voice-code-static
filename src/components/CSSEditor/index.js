import React, { Component } from 'react';
import CodeEditor from '../CodeEditor';
import StyleDialog from './StyleDialog';

class CSSEditor extends Component {
  handleClose = () => {
    this.state.open = false;
  };

  render() {
    const CSSModel = this.props.model;
    return (
      <React.Fragment>
        <CodeEditor mode="css" label="CSS" val={this.props.val} inFocus={this.props.inFocus} />
        {CSSModel.currentStyle && (
          <StyleDialog
            model={CSSModel.currentStyle}
            isOpen={this.props.context[1] === 'createStyle'}
            handleClose={this.handleClose}
            context={'Create Style'}
            onInputChange={this.props.onInputChange}
            sendQuery={this.props.sendQuery}
            spokenText={this.props.spokenText}
            startSpeechRecognition={this.props.startSpeechRecognition}
          />
        )}
      </React.Fragment>
    );
  }
}

export default CSSEditor;
