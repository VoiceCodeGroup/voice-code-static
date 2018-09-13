import React, { Component } from 'react';
import styled from 'styled-components';

const StyledFrame = styled.iframe`
  width: 80vw;
  min-height: 90vh;
`;

class Frame extends Component {
  /**
   * Called after mounting the component. Triggers initial update of
   * the iframe
   */
  componentDidMount() {
    this.updateIframe();
  }

  /**
   * Called each time the props changes. Triggers an update of the iframe to
   * pass the new content
   */
  componentDidUpdate() {
    this.updateIframe();
  }

  updateIframe() {
    const iframe = this.iframe;
    const { html, css, js } = this.props.content;
    const document = iframe.contentDocument;
    document.write(`${html}<style>${css}</style><script>${js}</script>`);
    document.close();
  }

  /**
   * This component renders just and iframe
   */
  render() {
    return (
      <StyledFrame
        innerRef={x => {
          this.iframe = x;
        }}
      />
    );
  }
}

export default Frame;
