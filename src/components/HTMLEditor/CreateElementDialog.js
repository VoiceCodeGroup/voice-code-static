import React, { Component } from 'react';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import QuerySection from '../AppBar/QueryItem';
import PropertiesSection from '../PropertiesSection';
import CodeSnippet from '../CodeSnippet';

const styles = {
  dialogPaper: {}
};

class ElementModal extends Component {
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
    const codeVal = await this.props.model.toString();
    this.setState({ codeVal });
  };

  render() {
    const {
      classes,
      isOpen,
      handleClose,
      context,
      onInputChange,
      sendQuery,
      spokenText,
      startSpeechRecognition,
      model
    } = this.props;

    const properties = model.getProps();

    return (
      <Dialog
        classes={{ paper: classes.dialogPaper }}
        maxWidth="false"
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
      >
        <DialogContent>
          <DialogContentText>{context}</DialogContentText>
          <DialogContentText>Properties</DialogContentText>
          <PropertiesSection properties={properties} />
          <CodeSnippet mode="html" label="Element" val={this.state.codeVal} />
          <QuerySection
            onInputChange={onInputChange}
            sendQuery={sendQuery}
            spokenText={spokenText}
            startSpeechRecognition={startSpeechRecognition}
          />
        </DialogContent>
      </Dialog>
    );
  }
}

export default withStyles(styles)(ElementModal);
