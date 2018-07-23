import React, { Component } from 'react';
import CodeEditor from '../CodeEditor';
import CreateElementDialog from './CreateElementDialog';

class HTMLEditor extends Component {
  handleClose = async () => {
    // because sendQuery is also used on click, the first argument would be 'event'
    await this.props.sendQuery(null, 'close window');
  };

  render() {
    const HTMLModel = this.props.model;
    return (
      <React.Fragment>
        <CodeEditor mode="html" label="HTML" val={this.props.val} inFocus={this.props.inFocus} />
        {HTMLModel.currentElement && (
          <CreateElementDialog
            model={HTMLModel.currentElement}
            isOpen={this.props.context[1] === 'createElement'}
            handleClose={this.handleClose}
            context={'Create Element Steve'}
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

export default HTMLEditor;
