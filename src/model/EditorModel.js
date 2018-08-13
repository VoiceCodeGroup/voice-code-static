import HTMLModel from './HTMLModel';
import CSSModel from './CSSModel';
import JSModel from './JSModel';

class Model {
  constructor(editorCallbacks) {
    this.editorCallbacks = editorCallbacks;

    this.state = {
      currentMode: 'html',
      html: { model: new HTMLModel(this.editorCallbacks), val: '<div id="root" />' },
      css: { model: new CSSModel(this.editorCallbacks), val: '' },
      js: { model: new JSModel(this.editorCallbacks), val: '' }
    };
  }

  getVals = () => ({
    html: this.state.html.val,
    css: this.state.css.val,
    js: this.state.js.val
  });

  getHTMLModel = () => this.state.html.model;

  getCSSModel = () => this.state.css.model;

  getJSModel = () => this.state.js.model;

  getMode = () => this.state.currentMode;

  performAction = async ({ intent, params }, context) => {
    console.log('CONTEXT', context);
    if (!context[1] && this[intent]) {
      if (this[intent]) {
        // GENERAL ACTION
        console.log(`Perform General ${intent} intent, params:`, params);
        await this[intent](params);
      }
    } else {
      const mode = context[0];
      // html, css or js action
      console.log(`Perform ${mode} ${intent} intent, params:`, params);

      const model = this.state[mode].model;
      await model.performAction({ intent, params }, context);
      this.state[mode].val = await model.toString();
    }

    return this.getVals();
  };

  // --------------------------------general actions-------------------------------//

  switchEditorToHTML = () => {
    this.editorCallbacks.updateContext(['html']);
  };

  switchEditorToCSS = () => {
    this.editorCallbacks.updateContext(['css']);
  };

  switchEditorToJS = () => {
    this.editorCallbacks.updateContext(['js']);
  };
}

export default Model;
