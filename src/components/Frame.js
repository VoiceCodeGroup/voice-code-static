import React, { Component } from 'react';
import styled from 'styled-components';

class Frame extends Component {
  myRef = React.createRef();
  componentDidMount() {
    console.log(
      this.myRef.current.contentWindow.eval(`
    
    var x = window.document.createElement('div');
    x.style.backgroundColor = "red";
    x.style.width = "100px";
    x.style.height = "100px";

    document.body.append(x);
    `)
    );
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
