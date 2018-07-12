import React, { Component } from 'react';
import styled from 'styled-components';

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
    const iframe = this.refs.iframe;
    const { html, css, js } = this.props.content;
    const document = iframe.contentDocument;
    document.write(`${html}<style>${css}</style><script>${js}</script>`);
    document.close();
  }

  /**
   * This component renders just and iframe
   */
  render() {
    return <iframe ref="iframe" width="100%" height="100%" />;
  }
}
export default styled(Frame)`
  width: 100%;
  min-height: 100vh;
  border: none;
`;
