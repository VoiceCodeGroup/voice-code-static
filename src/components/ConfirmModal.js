import React, { Component } from 'react';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import QuerySection from './AppBar/QueryItem';
import speechRecognition from '../util/speechRecognition';

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

class ConfirmModal extends Component {
  state = {
    spokenText: '',
    listening: false
  };

  componentDidMount() {
    this.setState({ SpeechRecognition: new speechRecognition(this.onSpeechResult) });
  }

  // toggleListening = async () => {
  //   await this.setState(prevState => ({
  //     listening: !prevState.listening
  //   }));

  //   if (this.state.listening) {
  //     this.startSpeechRecognition();
  //   } else {
  //     this.stopSpeechRecognition();
  //   }
  // };

  // startSpeechRecognition = () => {
  //   this.state.SpeechRecognition.start();
  //   this.setState({ spokenText: '' });
  // };

  // stopSpeechRecognition = () => {
  //   this.state.SpeechRecognition.stop();
  // };

  // onChange = event => {
  //   this.setState({ spokenText: event.target.value });
  // };

  // onSpeechResult = async event => {
  //   const last = event.results.length - 1;
  //   const spokenText = event.results[last][0].transcript;
  //   if (spokenText === 'yes') {
  //     this.props.sendQuery();
  //     this.props.handleClose();
  //   } else {
  //     this.props.handleClose();
  //   }
  // };

  handleClickYes = () => {
    this.props.sendQuery();
    this.props.handleClose();
  };

  // handleSubmit = () => {
  //   if (this.state.spokenText === 'yes') {
  //     this.props.sendQuery();
  //     this.props.handleClose();
  //   } else {
  //     this.props.handleClose();
  //   }
  // };

  render() {
    const { classes, isOpen, handleClose, title, spokenText, sendQuery, onChange, toggleListening, listening, startSpeechRecognition } = this.props;

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
            <DialogContentText>{spokenText}</DialogContentText>

            <QuerySection
              onInputChange={onChange}
              sendQuery={sendQuery}
              spokenText={spokenText}
              toggleListening={toggleListening}
              listening={listening}
              startSpeechRecognition={startSpeechRecognition}

            />
          </ContentWrapper>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClickYes} color="primary">
            Yes
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(ConfirmModal);
