import HtmlModel from './HtmlModel';
import CSSModel from './CSSModel';
import JSModel from './JSModel';

class Model {
  constructor() {
    this.state = {
      html: '',
      css: '',
      js: '',
      currentMode: 'html',
      htmlModel: new HtmlModel(),
      cssModel: new CSSModel(),
      jsModel: new JSModel()
    };
  }

  getVals = () => {
    return {
      html: this.state.html,
      css: this.state.css,
      js: this.state.js
    };
  };

  getMode = () => this.state.currentMode;

  performAction = async ({ intent, params }) => {
    console.log(`Perform ${intent} intent, params:`, params);
    await this[intent](params);
    return this.getVals();
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////
  //---------------------------------------ACTIONS-----------------------------------------------//
  /////////////////////////////////////////////////////////////////////////////////////////////////

  // --------------------------------general-------------------------------//

  switchEditorToHTML = () => {
    this.state.currentMode = 'html';
  };

  switchEditorToCSS = () => {
    this.state.currentMode = 'css';
  };

  switchEditorToJS = () => {
    this.state.currentMode = 'js';
  };

  // --------------------------------html-------------------------------//

  createElement = async ({ tag }) => {
    console.log('Creating element: ' + tag);
    this.state.htmlModel.addElement(tag);
    const newHTML = await this.state.htmlModel.toString();
    this.state = {
      ...this.state,
      html: newHTML
    };
  };

  // --------------------------------css-------------------------------//

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

  // --------------------------------js-------------------------------//

  addClickListener = async ({ id }) => {
    console.log(`add click listener for id: ${id}`);
    this.state.jsModel.addClickListener(id);
    const newJS = await this.state.jsModel.toString();
    this.state = {
      ...this.state,
      js: newJS
    };
  };

  setProperty = async ({ id, property, value }) => {
    console.log(`set ${property} to ${value} for id: ${id}`);
    this.state.jsModel.setProperty(id, property, value);
    const newJS = await this.state.jsModel.toString();
    this.state = {
      ...this.state,
      js: newJS
    };
  };
}

export default Model;
