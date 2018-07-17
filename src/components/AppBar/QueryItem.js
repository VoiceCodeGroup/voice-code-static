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

export default props => (
  <div>
    <IconButton onClick={props.startSpeechRecognition} color="inherit" aria-label="Menu">
      <VoiceRecordIcon />
    </IconButton>
    <StyledInput
      color="secondary"
      id="query"
      label="Query"
      value={props.spokenText}
      onChange={props.onInputChange}
    />
    <IconButton onClick={props.sendQuery} color="inherit" aria-label="Menu">
      <SendIcon />
    </IconButton>
  </div>
);
