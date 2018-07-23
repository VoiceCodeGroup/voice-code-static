import codeFormatter from '../../util/codeFormatter';
import StyleModel from './StyleModel';

class CSSModel {
  constructor(updateContext) {
    this.styles = [];
    this.updateContext = updateContext;
  }

  toString = async () => {
    let cssString = '';

    // Create each style
    // #id {}
    this.styles.forEach(style => {
      cssString = `${cssString}${style.selector} {`;

      // add each property e.g. width: 100px
      Object.entries(style.props).map(([key, value]) => {
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

  createStyle = ({ id }) => {
    this.currentStyle = new StyleModel(this.updateContext, id);
    this.updateContext(['css', 'createStyle']);
    // const selectorType = 'id';
    // const selectorTag = id;
    // console.log(`Creating an ${selectorType} style for ${selectorTag}`);
    // // #id, or .class
    // const selector = `${selectorType === 'id' ? '#' : '.'}${selectorTag}`;
    // this.styles.push({
    //   name: selectorTag,
    //   selector,
    //   props: {}
    // });
  };

  addProperty = ({ property, value }) => {
    // TODO: currently just adds to the first style
    this.styles[0].props[property] = value;
  };
}

export default CSSModel;
