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
        await this[intent](params, context);
        return this.getVals();
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

  stopSpeechRecognition = () => {
    this.editorCallbacks.toggleListening();
  };

  createTemplate = async (params, context) => {
    console.log('Create templates bitches');

    const htmlElements = [
      { tag: 'div', properties: { id: 'alpha', class: 'panel border' } },
      { tag: 'div', properties: { id: 'circle' } },
      { tag: 'div', properties: { id: 'bravo', class: 'panel border' } },
      { tag: 'button', properties: { id: 'purple' } },
      { tag: 'p', properties: { id: 'text' }, text: 'This is text' },
      { tag: 'div', properties: { id: 'charlie', class: 'panel border' } },
      { tag: 'button', properties: { id: 'click' } }
    ];

    await this.addHTML(htmlElements);

    const cssStyles = [];
  };

  addHTML = async elements => {
    for (let i = 0; i < elements.length; i++) {
      await this.addElement(elements[i]);
    }

    this.state['html'].val = await htmlModel.toString();
  };

  addElement = async element => {
    const tag = element.tag;
    const htmlModel = this.state['html'].model;
    await htmlModel.performAction({ intent: 'html_createElement', params: { tag } }, ['html']);

    const propPromises = Object.entries(element.properties).map(async ([property, value]) => {
      await htmlModel.performAction(
        { intent: 'html_element_setElementProperty', params: { property, value } },
        ['html', 'createElement']
      );
    });

    await Promise.all(propPromises);
    await htmlModel.performAction({ intent: 'html_element_finish' }, ['html', 'createElement']);
    this.state['html'].val = await htmlModel.toString();
  };
}

export default Model;
