import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import QuerySection from '../AppBar/QueryItem';
import PropertiesSection from '../PropertiesSection';

const styles = {
  dialogPaper: {}
};

const StyleDialog = ({
  classes,
  isOpen,
  handleClose,
  context,
  onInputChange,
  sendQuery,
  spokenText,
  startSpeechRecognition,
  model
}) => {
  const properties = model.props || {};

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
        <QuerySection
          onInputChange={onInputChange}
          sendQuery={sendQuery}
          spokenText={spokenText}
          startSpeechRecognition={startSpeechRecognition}
        />
      </DialogContent>
    </Dialog>
  );
};

export default withStyles(styles)(StyleDialog);