import React, { Component } from 'react';
import styled from 'styled-components';

class Frame extends Component {
  myRef = React.createRef();
  componentDidMount() {
    this.props.getExecute(this.myRef.current.contentWindow.eval);
  }

  render() {
    return <iframe ref={this.myRef} {...this.props} />;
  }
}

export default styled(Frame)`
  width: 100%;
  min-height: 100vh;
  border: none;
`;
