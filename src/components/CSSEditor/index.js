import React, { Component } from 'react';
import EditorPanel from '../EditorPanel';
import HelpPanel from '../HelpPanel';
import StyleDialog from './StyleDialog';

class CSSEditor extends Component {
  handleClose = async () => {
    // because sendQuery is also used on click, the first argument would be 'event'
    await this.props.sendQuery(null, 'finish');
  };

  render() {
    const CSSModel = this.props.model;
    if (this.props.help) {
      return <HelpPanel mode="css" label="CSS" inFocus={this.props.inFocus} />;
    } else {
      return (
        <React.Fragment>
          <EditorPanel
            mode="css"
            id="css"
            label="CSS"
            val={this.props.val}
            inFocus={this.props.inFocus}
          />
          {CSSModel.currentStyle && (
            <StyleDialog
              model={CSSModel.currentStyle}
              isOpen={this.props.context[1] === 'createStyle'}
              handleClose={this.handleClose}
              title="Create Style"
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
}

export default CSSEditor;
