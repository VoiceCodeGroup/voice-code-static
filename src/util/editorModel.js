import codeFormatter from './codeFormatter';

class Model {
  constructor() {
    this.state = {
      html: '',
      css: '',
      js: '',
      previousState: [],
      currentMode: 'html'
    };
  }
  createElement = async tag => {
    console.log('Creating element: ' + tag);
    const newHTML = await this.formatCode(
      `<div>${this.state.html}<${tag}>Hello World!</${tag}></div>`
    );
    this.state = {
      ...this.state,
      html: newHTML
    };
  };

  getVals = () => {
    return {
      html: this.state.html,
      css: this.state.css,
      js: this.state.js
    };
  };

  formatCode = async code => {
    const formattedCode = await codeFormatter(code, this.state.currentMode);
    return formattedCode;
  };

  performAction = async ({ intent, params }) => {
    console.log('Perform', intent, params);
    await this[intent](...params);
    return this.getVals();
  };
}

export default Model;
