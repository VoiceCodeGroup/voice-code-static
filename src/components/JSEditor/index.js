import React, { Component } from 'react';
import EditorPanel from '../EditorPanel';
import HelpPanel from '../HelpPanel';
import EventListenerDialog from './EventListenerDialog';

class JSEditor extends Component {
  handleClose = async () => {
    // because sendQuery is also used on click, the first argument would be 'event'
    await this.props.sendQuery(null, 'close window');
  };

  render() {
    const jsModel = this.props.jsModel;
    if (this.props.help) {
      return <HelpPanel mode="js" label="JavaScript" inFocus={this.props.inFocus} />;
    } else {
      return (
        <React.Fragment>
          <EditorPanel
            mode="js"
            id="js"
            label="JavaScript"
            val={this.props.val}
            inFocus={this.props.inFocus}
          />
          {jsModel.currentSection && (
            <EventListenerDialog
              title="Event Listener"
              model={jsModel.currentSection}
              context={this.props.context}
              isOpen={this.props.context[1] === 'createEventListener'}
              handleClose={this.handleClose}
              onInputChange={this.props.onInputChange}
              sendQuery={this.props.sendQuery}
              spokenText={this.props.spokenText}
              toggleListening={this.props.toggleListening}
              listening={this.props.listening}
              startSpeechRecognition={this.props.startSpeechRecognition}
            />
          )}
        </React.Fragment>
      );
    }
  }
}

export default JSEditor;
