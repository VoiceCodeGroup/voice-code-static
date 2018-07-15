import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const styles = {
  dialogPaper: {}
};

const PreviewModal = ({ classes, isOpen, handleClose, context }) => (
  <Dialog
    classes={{ paper: classes.dialogPaper }}
    maxWidth="false"
    open={isOpen}
    onClose={handleClose}
    aria-labelledby="simple-dialog-title"
  >
    <DialogContent>
      <DialogContentText>{context}</DialogContentText>
      <TextField
        margin="dense"
        id="name"
        label="Property"
        placeholder="set color to red"
        type="text"
        fullWidth
      />
      <TextField margin="dense" id="name" label="Email Address" type="text" fullWidth />
      <TextField margin="dense" id="name" label="Email Address" type="text" fullWidth />
    </DialogContent>
  </Dialog>
);

export default withStyles(styles)(PreviewModal);
