import React from 'react';

import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/solarized_dark';

const onChange = (a, b) => {
  console.log(a, b);
};

export default ({ val, onChange }) => {
  return (
    <AceEditor
      mode="javascript"
      theme="solarized_dark"
      onChange={onChange}
      value={val}
      name="UNIQUE_ID_OF_DIV"
      width={window.innerWidth / 2 > 500 ? 500 : window.innerWidth / 2}
    />
  );
};
