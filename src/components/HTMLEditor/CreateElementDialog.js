import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
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

class ElementModal extends Component {
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
      id: <Suggestion text="set id to {id}" />,
      class: <Suggestion text="set class to {class}" />,
      text: <Suggestion text="set text to {text}" />
    };

    const modelProperties = model.getProps();
    const mergedProperties = { ...defaultProperties };

    Object.entries(modelProperties).map(([name, value]) => {
      mergedProperties[name] = modelProperties[name];
    });

    if (model.getTextProp()) {
      mergedProperties['text'] = model.getTextProp();
    }

    const propsArray = Object.entries(mergedProperties);

    return (
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        maxWidth={false}
      >
        <DialogContent>
          <ContentWrapper>
            <Title>{title}</Title>
            <PropertiesSection properties={propsArray} />
            <CodeSnippet mode="html" id="element" label="Element" val={this.state.codeVal} />
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

export default ElementModal;
