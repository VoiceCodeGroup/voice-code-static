import React, { Component } from 'react';
import styled from 'styled-components';

class Frame extends Component {

  /**
   * Called after mounting the component. Triggers initial update of
   * the iframe
   */
  componentDidMount() {
      this._updateIframe();
  }

  /**
   * Called each time the props changes. Triggers an update of the iframe to
   * pass the new content
   */
  componentDidUpdate() {
      this._updateIframe();
  }


  _updateIframe() {
      const iframe = this.refs.iframe;
      const document = iframe.contentDocument;
      const head = document.getElementsByTagName('head')[0];
      document.body.innerHTML = this.props.content;
  }

  /**
   * This component renders just and iframe
   */
  render() {
      return <iframe ref="iframe" width="100%" height="100%"/>
  }
}
export default styled(Frame)`
  width: 100%;
  min-height: 100vh;
  border: none;
`;