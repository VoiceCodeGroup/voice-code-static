import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/PlayCircleFilled';
import VoiceRecordIcon from '@material-ui/icons/SettingsVoice';
import Input from '@material-ui/core/Input';
import React from 'react';
import styled from 'styled-components';
import Suggestion from '../Suggestion';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  margin-right: 10px;
`;

const PageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

const StyledInput = styled(Input)`
  &&{color:${props=> props.light ? 'white' : 'black' }
`;

export default ({ toggleListening, spokenText, onInputChange, sendQuery, listening, light }) => {
  const onKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendQuery();
    }
  };

  const colour = listening ? 'secondary' : 'inherit';
  return (
    <PageWrapper>
      <Wrapper>
        <IconButton
          onClick={toggleListening}
          color={colour}
          aria-label="Menu"
          style={{ height: 36 }}
        >
          <VoiceRecordIcon />
        </IconButton>
        {listening && <Suggestion text={'STOP'} fontSize={10} />}
      </Wrapper>

      <StyledInput
        light={light}
        color="secondary"
        id="query"
        label="Query"
        value={spokenText}
        onChange={onInputChange}
        onKeyPress={onKeyPress}
        autoFocus
      />
      <IconButton onClick={sendQuery} color="inherit" aria-label="Menu">
        <SendIcon />
      </IconButton>
    </PageWrapper>
  );
};
