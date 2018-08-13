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
      cssString = `${style.getSelectorString()} {`;

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

  createStyle = () => {
    this.currentStyle = new StyleModel(this.editorCallbacks);
    this.styles.push(this.currentStyle);
    this.editorCallbacks.updateContext(['css', 'createStyle']);
  };
}

export default CSSModel;
