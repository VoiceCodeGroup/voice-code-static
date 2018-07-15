import React, { Component } from 'react';
import Dialog from './Dialog';

export default class extends Component {
  render() {
    console.log(this.props.context);
    const contexts = {
      createElement: (
        <Dialog
          context="Create HTML Element"
          isOpen={this.props.context === 'createElement'}
          handleClose={this.props.handleClose}
        />
      )
    };

    return contexts[this.props.context] || null;
  }
}
