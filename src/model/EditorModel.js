import HtmlModel from './HtmlModel';
import CSSModel from './CSSModel';
import JSModel from './JSModel';

class Model {
  constructor() {
    this.state = {
      currentMode: 'html',
      html: { model: new HtmlModel(), val: '' },
      css: { model: new CSSModel(), val: '' },
      js: { model: new JSModel(), val: '' }
    };
  }

  getVals = () => {
    return {
      html: this.state.html.val,
      css: this.state.css.val,
      js: this.state.js.val
    };
  };

  getMode = () => this.state.currentMode;

  performAction = async ({ intent, params }, openContext) => {
    if (this[intent]) {
      // GENERAL ACTION
      console.log(`Perform General ${intent} intent, params:`, params);
      await this[intent](params);
    } else {
      // html, css or js action
      console.log(`Perform ${this.state.currentMode} ${intent} intent, params:`, params);
      const mode = this.state.currentMode;
      const model = this.state[mode].model;
      await model[intent](params, openContext);
      this.state[mode].val = await model.toString();
    }

    return this.getVals();
  };

  // --------------------------------general actions-------------------------------//

  switchEditorToHTML = () => {
    this.state.currentMode = 'html';
  };

  switchEditorToCSS = () => {
    this.state.currentMode = 'css';
  };

  switchEditorToJS = () => {
    this.state.currentMode = 'js';
  };
}

export default Model;
