import React, { Component } from 'react';

import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/mode/html';
import 'brace/mode/css';
import 'brace/theme/tomorrow';

const onChange = (a, b) => {
  console.log(a, b);
};



export default class CodeEditor extends Component{
  constructor (props) {
    super(props);
  }

  onHTMLChange(event) {
    // for a regular input field, read field name and value from the event
    const fieldValue = event.target.value;
    this.props.onChange('htmlCode', fieldValue);
  }
  onCSSChange(event) {
    // for a regular input field, read field name and value from the event
    const fieldValue = event.target.value;
    this.props.onChange('cssCode', fieldValue);
  }
  onJSChange(event) {
    // for a regular input field, read field name and value from the event
    const fieldValue = event.target.value;
    this.props.onChange('jsCode', fieldValue);
  }
  
  render(){
    return (
      <AceEditor
        mode={this.props.mode}
        theme="tomorrow"
        onChange={()=>{
          if(this.props.mode === "html"){ this.onHTMLChange.bind(this);}
          else if (this.props.mode === "css"){ this.onCSSChange.bind(this);}
          else{this.onJSChange.bind(this);}
          }}
        value={this.props.val}
        name="UNIQUE_ID_OF_DIV"
        height = {this.props.height}
        width = {this.props.width}
      />  
    );}
};
