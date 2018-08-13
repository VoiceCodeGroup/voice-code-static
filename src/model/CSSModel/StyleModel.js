import codeFormatter from '../../util/codeFormatter';

class StyleModel {
  constructor(editorCallbacks, id) {
    this.editorCallbacks = editorCallbacks;

    this.selectorType = '';
    this.selectorValue = '';
    this.properties = {};
  }

  getSelectorType = () => this.selectorType;

  getSelectorValue = () => this.selectorValue;

  getSelectorString = () => {
    let selectorString = '';
    switch (this.selectorType) {
      case 'class':
        selectorString += '.';
        break;

      case 'id':
        selectorString += '#';
    }

    selectorString += this.selectorValue;
    return selectorString;
  };

  getProperties = () => this.properties;

  toString = async () => {
    let cssString = '';
    // if (this.getSelectorType() === '' || this.getSelectorValue() === '') {
    //   return cssString;
    // }

    cssString = `${this.getSelectorString()} {`;

    // add each property e.g. width: 100px
    Object.entries(this.properties).map(([key, value]) => {
      cssString += `${key}: ${value};`;
    });

    cssString += '}';

    const formattedCSS = await codeFormatter(cssString, 'css');
    return formattedCSS;
  };

  performAction = async ({ intent, params }, context) => {
    console.log('Style action');
    if (this[intent]) {
      await this[intent](params, context);
    }
  };

  //----------------------------------------------------------Actions-------------------------------------------//

  css_style_setSelectorType = ({ selectorType }) => {
    this.selectorType = selectorType;
  };

  css_style_setSelectorValue = ({ selectorValue }) => {
    this.selectorValue = selectorValue;
  };

  css_style_setCSSProperty = ({ property, value }) => {
    this.properties[property] = value;
  };

  css_style_finish = () => {
    this.editorCallbacks.updateContext(['css']);
  };
}

export default StyleModel;
