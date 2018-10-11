import React from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import VoiceRecordIcon from '@material-ui/icons/SettingsVoice';
import { withStyles } from '@material-ui/core/styles';
import QueryItem from './QueryItem';

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1,
    fontSize: 30
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <AppBar position="absolute">
      <Toolbar>
        <Typography variant="title" color="inherit" className={classes.flex}>
          Decode
        </Typography>

        <QueryItem
          light
          sendQuery={props.sendQuery}
          spokenText={props.spokenText}
          onInputChange={props.onInputChange}
          toggleListening={props.toggleListening}
          listening={props.listening}
        />
      </Toolbar>
    </AppBar>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonAppBar);
