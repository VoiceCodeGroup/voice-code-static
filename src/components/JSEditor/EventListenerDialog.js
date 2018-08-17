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
import SetStyleDialog from './SetStyleDialog';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const Title = styled.h2``;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const styles = {
  dialogPaper: {},
  tabletitle:{
    fontSize: '16pt'
  },
  tablecell:{
    fontSize:'12pt'
  }
};

class EventListenerModal extends Component {
  state = {
    codeVal: '',
    formattedCode: ''
  };

  componentDidMount = () => {
    this.updateCode();
  };

  componentDidUpdate = async (prevProps, prevState) => {
    const codeVal = await this.props.model.toString();
    // Only update if there is a change
    if (codeVal !== prevState.codeVal) {
      const formattedCode = await this.props.model.toFormattedString();
      this.setState({ codeVal, formattedCode });
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
      model,
      context
    } = this.props;

    const targetIDSection = {
      'Target ID': model.getTargetID()
    };

    let id = 0;
    function createData(property, value) {
      id += 1;
      return { id, property, value};
    }

    // const properties = model.getProps();
    // console.log(properties);
    let data = [];
    data.push(createData("Target ID", targetIDSection["Target ID"]));
    // Object.keys(properties).forEach(n =>{
    //   data.push(createData(n, properties[n]));
    // });

    return (
      <React.Fragment>
        <Dialog
          classes={{ paper: classes.dialogPaper }}
          open={isOpen}
          onClose={handleClose}
          aria-labelledby="simple-dialog-title"
          maxWidth={false}
        >
          <DialogContent>
            <ContentWrapper>
              <Title>{title}</Title>

              <Table >
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tabletitle}>Target ID</TableCell>
                  <TableCell className={classes.tabletitle}>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map(n => {
                  return (
                    <TableRow key={n.id} className={classes.tablecell}>
                      <TableCell component="th" scope="row" className={classes.tablecell}>
                        {n.property}
                      </TableCell>
                      <TableCell className={classes.tablecell}>{n.value}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
              {/*<PropertiesSection properties={targetIDSection} /> */}
              <CodeSnippet
                mode="js"
                id="eventListener"
                label="Event Listener"
                val={this.state.formattedCode}
              />
              <QuerySection
                onInputChange={onInputChange}
                sendQuery={sendQuery}
                spokenText={spokenText}
                toggleListening={this.props.toggleListening}
                listening={this.props.listening}
                startSpeechRecognition={startSpeechRecognition}
              />
            </ContentWrapper>
          </DialogContent>
        </Dialog>
        {model.currentSection && (
          <SetStyleDialog
            title="Style Something"
            model={model.currentSection}
            isOpen={context[2] === 'codeSection'}
            handleClose={handleClose}
            context={context}
            onInputChange={onInputChange}
            sendQuery={sendQuery}
            spokenText={spokenText}
            toggleListening={this.props.toggleListening}
            listening={this.props.listening}
            startSpeechRecognition={startSpeechRecognition}
          />
        )}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(EventListenerModal);
