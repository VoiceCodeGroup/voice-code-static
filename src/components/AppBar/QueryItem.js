import React from 'react';
import styled from 'styled-components';
import TextInput from '../TextInput';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/PlayCircleFilled';
import Input from '@material-ui/core/Input';

const StyledInput = styled(Input)`
  && {
    color: white;
  }
`;

export default props => (
  <div>
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
