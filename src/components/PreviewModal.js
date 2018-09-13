import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import Frame from './Frame';

const styles = {
  dialogPaper: {
    width: '80vw',
    maxWidth: '80vw',
    minHeigt: '90vh'
  }
};

const PreviewModal = ({ classes, isOpen, handleClose, codeVals }) => (
  <Dialog
    classes={{ paper: classes.dialogPaper }}
    open={isOpen}
    onClose={handleClose}
    aria-labelledby="simple-dialog-title"
  >
    <Frame content={codeVals} />
  </Dialog>
);

export default withStyles(styles)(PreviewModal);
