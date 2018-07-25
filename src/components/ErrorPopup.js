import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4
  }
});

class ErrorPopup extends React.Component {
  // state = {
  //   open: false
  // };

  // handleClick = () => {
  //   this.setState({ open: true });
  // };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.props.closePopup();

    //   this.setState({ open: false });
    // };
  };

  render() {
    const { classes, open } = this.props;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={open}
        autoHideDuration={4000}
        onClose={this.handleClose}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={<span id="message-id">Note archived</span>}
        action={[
          <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
            UNDO
          </Button>,
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={this.handleClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    );
  }
}

ErrorPopup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ErrorPopup);
