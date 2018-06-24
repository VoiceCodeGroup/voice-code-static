import codeFormatter from '../util/codeFormatter';
import HtmlModel from './HtmlModel';

class Model {
  constructor() {
    this.state = {
      html: '',
      css: '',
      js: '',
      previousState: [],
      currentMode: 'html',
      htmlModel: new HtmlModel()
    };
  }
  createElement = async tag => {
    console.log(this.state.htmlModel.toString());
    console.log('Creating element: ' + tag);
    this.state.htmlModel.addElement(tag);
    const newHTML = await this.formatCode(this.state.htmlModel.toString());
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
