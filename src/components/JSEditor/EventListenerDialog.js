import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import styled from 'styled-components';
import QuerySection from '../AppBar/QueryItem';
import CodeSnippet from '../CodeSnippet';
import PropertiesSection from '../PropertiesSection';
import SetStyleDialog from './SetStyleDialog';
import Suggestion from '../Suggestion';

const Title = styled.h2``;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const styles = {
  dialogPaper: {},
  tabletitle: {
    fontSize: '16pt'
  },
  tablecell: {
    fontSize: '12pt'
  }
};

class EventListenerModal extends Component {
  state = {
    codeVal: '',
    formattedCode: ''
  };

  componentDidMount = () => {
    this.updateCode();
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const codeVal = await this.props.model.toString();
    // Only update if there is a change
    if (codeVal !== prevState.codeVal) {
      const formattedCode = await this.props.model.toFormattedString();
      this.setState({ codeVal, formattedCode });
    }
  };

  updateCode = async () => {
    const codeVal = await this.props.model.toFormattedString();
    this.setState({ codeVal });
  };

  render() {
    const {
      classes,
      isOpen,
      handleClose,
      title,
      onInputChange,
      sendQuery,
      spokenText,
      startSpeechRecognition,
      model,
      context
    } = this.props;

    const defaultProperties = {
      'Target ID': model.getTargetID() || <Suggestion text="target {id}" />,
      'Select an id': <Suggestion text="select {id}" />
    };

    const propsArray = Object.entries(defaultProperties);

    return (
      <React.Fragment>
        <Dialog
          classes={{ paper: classes.dialogPaper }}
          open={isOpen}
          onClose={handleClose}
          aria-labelledby="simple-dialog-title"
          maxWidth={false}
        >
          <DialogContent>
            <ContentWrapper>
              <Title>{title}</Title>
              <PropertiesSection properties={propsArray} />
              <CodeSnippet
                mode="js"
                id="eventListener"
                label="Event Listener"
                val={this.state.formattedCode}
              />
              <QuerySection
                onInputChange={onInputChange}
                sendQuery={sendQuery}
                spokenText={spokenText}
                toggleListening={this.props.toggleListening}
                listening={this.props.listening}
                startSpeechRecognition={startSpeechRecognition}
              />
            </ContentWrapper>
          </DialogContent>
        </Dialog>
        {model.currentSection && (
          <SetStyleDialog
            title="Style Something"
            model={model.currentSection}
            isOpen={context[2] === 'codeSection'}
            handleClose={handleClose}
            context={context}
            onInputChange={onInputChange}
            sendQuery={sendQuery}
            spokenText={spokenText}
            toggleListening={this.props.toggleListening}
            listening={this.props.listening}
            startSpeechRecognition={startSpeechRecognition}
          />
        )}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(EventListenerModal);
