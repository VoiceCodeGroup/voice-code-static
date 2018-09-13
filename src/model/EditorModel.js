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

  resetCode = () => {
    this.state = {
      currentMode: 'html',
      html: { model: new HTMLModel(this.editorCallbacks), val: '<div id="root" />' },
      css: { model: new CSSModel(this.editorCallbacks), val: '' },
      js: { model: new JSModel(this.editorCallbacks), val: '' }
    };
    this.editorCallbacks.updateContext(['html']);
  };

  refresh = async () => {
    await window.location.reload();
    this.editorCallbacks.toggleListening();
  };

  createTemplate = async (params, context) => {
    console.log('Create templates bitches');

    const htmlElements = [
      { tag: 'div', properties: { id: 'alpha', class: 'panel border' } },
      { tag: 'div', properties: { id: 'bravo', class: 'panel border' } },
      { tag: 'button', properties: { id: 'purple' } },
      { tag: 'p', properties: { id: 'text' }, text: 'This is text' },
      { tag: 'div', properties: { id: 'charlie', class: 'panel border' } },
      { tag: 'button', properties: { id: 'click' } }
    ];

    await this.addHTML(htmlElements);

    // [child, parent]
    const htmlNest = [['purple', 'bravo'], ['text', 'purple'], ['click', 'charlie']];

    await this.nestHTML(htmlNest);

    const cssStyles = [
      {
        selectorType: 'id',
        selectorValue: 'root',
        properties: {
          margin: 'auto',
          height: '800px',
          width: '50%'
        }
      },
      {
        selectorType: 'class',
        selectorValue: 'panel',
        properties: {
          margin: '10px 10px 10px 10px',
          height: '150px',
          width: '100%',
          'border-style': 'solid',
          display: 'flex',
          'justify-content': 'center',
          'align-items': 'center'
        }
      },
      {
        selectorType: 'id',
        selectorValue: 'circle',
        properties: {
          'border-radius': '50px',
          'border-style': 'solid',
          height: '100px',
          width: '100px',
          background: 'red'
        }
      },
      {
        selectorType: 'class',
        selectorValue: 'blue',
        properties: {
          background: 'blue'
        }
      },
      {
        selectorType: 'id',
        selectorValue: 'click',
        properties: {
          height: '50px',
          width: '50px'
        }
      }
    ];

    await this.addCSS(cssStyles);

    this.editorCallbacks.updateContext(['html']);
  };

  addHTML = async elements => {
    const htmlModel = this.state['html'].model;
    for (let i = 0; i < elements.length; i++) {
      await this.addElement(elements[i]);
    }

    this.state['html'].val = await htmlModel.toString();
  };

  nestHTML = async elements => {
    const htmlModel = this.state['html'].model;
    for (let i = 0; i < elements.length; i++) {
      const [childID, parentID] = elements[i];
      await htmlModel.performAction({ intent: 'html_nestElement', params: { childID, parentID } }, [
        'html'
      ]);
    }

    this.state['html'].val = await htmlModel.toString();
  };

  addCSS = async styles => {
    const cssModel = this.state['css'].model;
    for (let i = 0; i < styles.length; i++) {
      await this.addStyle(styles[i]);
      this.state['css'].val = await cssModel.toString();
    }

    this.state['css'].val = await cssModel.toString();
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

  addStyle = async style => {
    const { selectorType, selectorValue, properties } = style;
    const cssModel = this.state['css'].model;
    await cssModel.performAction({ intent: 'css_createStyle' }, ['css']);

    await cssModel.performAction(
      { intent: 'css_style_setSelectorType', params: { selectorType } },
      ['css', 'createStyle']
    );

    await cssModel.performAction(
      { intent: 'css_style_setSelectorValue', params: { selectorValue } },
      ['css', 'createStyle']
    );

    const propPromises = Object.entries(properties).map(async ([property, value]) => {
      await cssModel.performAction(
        { intent: 'css_style_setCSSProperty', params: { property, value } },
        ['css', 'createStyle']
      );
    });

    await Promise.all(propPromises);
    await cssModel.performAction({ intent: 'css_style_finish' }, ['css', 'createStyle']);
    this.state['css'].val = await cssModel.toString();
  };
}

export default Model;
