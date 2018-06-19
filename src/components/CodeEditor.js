import React, { Component } from 'react';

import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/mode/html';
import 'brace/mode/css';
import 'brace/theme/tomorrow';

export default class CodeEditor extends Component{
  constructor (props) {
    super(props);
  }

  onEditorChange = val => {
    console.log(val);
    this.props.onChange(`${this.props.mode}Code`, val);
  }
  
  render(){
    return (
      <AceEditor
        mode={this.props.mode}
        theme="tomorrow"
        onChange={this.onEditorChange.bind(this)}
        value={this.props.val}
        name="UNIQUE_ID_OF_DIV"
        height = {this.props.height}
        width = {this.props.width}
      />  
    );}
};
