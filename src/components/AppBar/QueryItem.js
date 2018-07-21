import React from 'react';
import styled from 'styled-components';
import SendIcon from '@material-ui/icons/PlayCircleFilled';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import VoiceRecordIcon from '@material-ui/icons/SettingsVoice';

const StyledInput = styled(Input)`
  && {
  }
`;

export default ({ startSpeechRecognition, spokenText, onInputChange, sendQuery }) => {
  const onKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendQuery();
    }
  };

  return (
    <div>
      <IconButton onClick={startSpeechRecognition} color="inherit" aria-label="Menu">
        <VoiceRecordIcon />
      </IconButton>
      <StyledInput
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
    </div>
  );
};
