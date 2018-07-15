import React from 'react';
import styled from 'styled-components';
import Frame from './Frame';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  dialogPaper: {}
};

const PreviewModal = ({ classes, isOpen, handleClose, codeVals }) => (
  <Dialog
    classes={{ paper: classes.dialogPaper }}
    maxWidth="false"
    open={isOpen}
    onClose={handleClose}
    aria-labelledby="simple-dialog-title"
  >
    <Frame content={codeVals} />
  </Dialog>
);

export default withStyles(styles)(PreviewModal);
