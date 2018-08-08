import React, { Component } from 'react';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import QuerySection from '../AppBar/QueryItem';
import PropertiesSection from '../PropertiesSection';
import CodeSnippet from '../CodeSnippet';
import { Target } from 'react-popper';

const Title = styled.h2``;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const styles = {
  dialogPaper: {}
};

class EventListenerModal extends Component {
  state = {
    codeVal: ''
  };

  componentDidMount = () => {
    this.updateCode();
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const codeVal = await this.props.model.toString();
    // Only update if there is a change
    if (codeVal !== prevState.codeVal) {
      this.setState({ codeVal });
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
      model
    } = this.props;

    const targetIDSection = {
      'Target ID': model.getTargetID()
    };

    return (
      <Dialog
        classes={{ paper: classes.dialogPaper }}
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
      >
        <DialogContent>
          <ContentWrapper>
            <Title>{title}</Title>
            <PropertiesSection properties={targetIDSection} />
            <CodeSnippet
              mode="js"
              id="eventListener"
              label="Event Listener"
              val={this.state.codeVal}
            />
            <QuerySection
              onInputChange={onInputChange}
              sendQuery={sendQuery}
              spokenText={spokenText}
              startSpeechRecognition={startSpeechRecognition}
            />
          </ContentWrapper>
        </DialogContent>
      </Dialog>
    );
  }
}

export default withStyles(styles)(EventListenerModal);
