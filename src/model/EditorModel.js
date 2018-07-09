import HtmlModel from './HtmlModel';
import CSSModel from './CSSModel';

class Model {
  constructor() {
    this.state = {
      html: '',
      css: '',
      js: '',
      previousState: [],
      currentMode: 'html',
      htmlModel: new HtmlModel(),
      cssModel: new CSSModel()
    };
  }

  createElement = async ({ tag }) => {
    console.log('Creating element: ' + tag);
    this.state.htmlModel.addElement(tag);
    const newHTML = await this.state.htmlModel.toString();
    this.state = {
      ...this.state,
      html: newHTML
    };
  };

  switchEditor = ({ editor }) => {
    this.state.currentMode = editor;
    console.log('EDITOR', editor);
  };

  switchEditorToHTML = () => {
    this.state.currentMode = 'html';
  };

  switchEditorToCSS = () => {
    this.state.currentMode = 'css';
  };

  switchEditorToJS = () => {
    this.state.currentMode = 'js';
  };

  createStyle = async ({ id }) => {
    console.log('create style for id: ' + id);
    this.state.cssModel.addStyle('id', id);
    const newCSS = await this.state.cssModel.toString();
    this.state = {
      ...this.state,
      css: newCSS
    };
  };

  addProperty = async ({ property, value }) => {
    console.log(`add css property ${property} with value ${value}`);
    this.state.cssModel.addProperty(property, value);
    const newCSS = await this.state.cssModel.toString();
    this.state = {
      ...this.state,
      css: newCSS
    };
  };

  addStyleProperty;

  getVals = () => {
    return {
      html: this.state.html,
      css: this.state.css,
      js: this.state.js
    };
  };

  getMode = () => this.state.currentMode;

  formatCode = async code => {
    const formattedCode = await codeFormatter(code, this.state.currentMode);
    return formattedCode;
  };

  performAction = async ({ intent, params }) => {
    console.log(`Perform ${intent} intent, params:`, params);
    await this[intent](params);
    return this.getVals();
  };
}

export default Model;
