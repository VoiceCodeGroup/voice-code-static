import Dialog from '@material-ui/core/Dialog';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import Frame from './Frame';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    dialogPaper: {},
    root: {
        flexGrow: 1,
        backgroundColor : 'rgba(0,0,0,0)'
    },
    editorHelp: {
        padding: theme.spacing.unit * 2,
        color: theme.palette.text.secondary,
        height: '60vh',
        width: '20vw'
    },
    navigationHelp:{
        padding: theme.spacing.unit * 2,
        color: theme.palette.text.secondary,
        height: '20vh',
        width: 'calc(60vw + 96px)'
    },
    title:{
        textAlign: 'center',
    }
});

    const PreviewModal = ({ classes, isOpen, handleClose}) => (
    <Dialog
        classes={{ paper: classes.dialogPaper }}
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        maxWidth={false}
    >
    {/* <Wrapper> */}
      
    {/* <div className={classes.root}> */}
        <Grid container className={classes.root} spacing={16}>
            <Grid item xs={12}>
                <Grid container className={classes.demo} justify="center" spacing={16}>
                    <Grid item>
                        <Paper className={classes.editorHelp} >
                            <Card className = {classes.html}>
                            <CardContent>
                                <Typography className={classes.title} variant="title">
                                HTML
                                </Typography>
                                <Typography className={classes.subheading} variant="subheading">
                                    To add an HTML element:
                                </Typography>
                                <Typography variant="body1">
                                    Say "Create element [element name]"
                                    A helper window will prompt for properties

                                </Typography>
                            </CardContent>
                            </Card>
                        </Paper>
                    </Grid>

                    <Grid item>
                        <Paper className={classes.editorHelp} >
                            CSS
                        </Paper>
                    </Grid>

                    <Grid item>
                        <Paper className={classes.editorHelp} >
                            JavaScript
                        </Paper>
                    </Grid>                
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Grid container className={classes.navigation} justify="center">
                    <Grid item>
                        <Paper className={classes.navigationHelp} >
                            Navigation
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
      {/* </div> */}

      {/* <Panel> <Label>HTML</Label> </Panel>
      <Panel> <Label>CSS</Label> </Panel>
      <Panel> <Label>JavaScript</Label> </Panel> */}
    
    {/* </Wrapper> */}
  </Dialog>
);

export default withStyles(styles)(PreviewModal);
