import codeFormatter from '../../util/codeFormatter';
import StyleModel from './StyleModel';

class CSSModel {
  constructor(editorCallbacks) {
    this.styles = [];
    this.editorCallbacks = editorCallbacks;
  }

  toString = async () => {
    let cssString = '';

    // Create each style
    // #id {}
    this.styles.forEach(style => {
      cssString += `${style.getSelectorString()} {`;

      // add each property e.g. width: 100px
      Object.entries(style.getProperties()).map(([key, value]) => {
        cssString += `${key}: ${value};`;
      });

      cssString += '}';
    });

    const formattedCSS = await codeFormatter(cssString, 'css');
    return formattedCSS;
  };

  performAction = async ({ intent, params }, context) => {
    console.log('CSS action');
    if (!context[1]) {
      if (this[intent]) {
        //
        console.log(`Perform CSS ${intent} intent, params:`, params);
        await this[intent](params);
      }
    } else {
      if (context[1] === 'createStyle') {
        await this.currentStyle.performAction({ intent, params }, context);
      }
    }
  };

  //----------------------------------------------------------Actions-------------------------------------------//

  css_createStyle = () => {
    this.currentStyle = new StyleModel(this.editorCallbacks);
    this.styles.push(this.currentStyle);
    this.editorCallbacks.updateContext(['css', 'createStyle']);
  };

  css_deleteStyle = ({ selectorType, selectorValue }) => {
    console.log(`Delete style ${selectorType} ${selectorValue}`);
    let found = false;
    this.styles.forEach((style, index) => {
      if (style.getSelectorType() === selectorType && style.getSelectorValue() === selectorValue) {
        this.styles.splice(index, 1);
        found = true;
      }
    });

    if (!found) {
      this.editorCallbacks.handleError(`Style ${selectorType} ${selectorValue} not found`);
      return;
    }
  };

  css_openPreview = () => {
    this.editorCallbacks.openPreview();
  };

  css_closePreview = () => {
    this.editorCallbacks.closePreview();
  };

  css_openHelp = () => {
    this.editorCallbacks.openHelp();
  };

  css_closeHelp = () => {
    this.editorCallbacks.closeHelp();
  };
}

export default CSSModel;
