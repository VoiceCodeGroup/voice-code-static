import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import styled from 'styled-components';
import QuerySection from '../AppBar/QueryItem';
import CodeSnippet from '../CodeSnippet';
import PropertiesSection from '../PropertiesSection';
import Suggestion from '../Suggestion';

const Title = styled.h3`
  margin-bottom: 0;
  margin-top: 5px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const styles = {
  dialogPaper: {},
  tabletitle: {
    fontSize: '16pt'
  },
  tablecell: {
    fontSize: '12pt'
  }
};

class StyleDialog extends Component {
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
      title,
      onInputChange,
      sendQuery,
      spokenText,
      startSpeechRecognition,
      model
    } = this.props;

    const defaultProperties = {
      'Selector Type': model.getSelectorType() || <Suggestion text="[class, id, element] type" />,
      'Selector Value': model.getSelectorValue() || <Suggestion text="set value to {value}" />,
      property: <Suggestion text="set {property} to {value}" />
    };

    const modelProperties = model.getProperties();
    const mergedProperties = { ...defaultProperties };

    Object.entries(modelProperties).map(([name, value]) => {
      mergedProperties[name] = modelProperties[name];
    });

    const propsArray = Object.entries(mergedProperties);

    return (
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
            <PropertiesSection properties={propsArray} />
            <CodeSnippet mode="css" id="style" label="Style" val={this.state.codeVal} />
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
    );
  }
}

export default withStyles(styles)(StyleDialog);
