import codeFormatter from '../util/codeFormatter';

class CSSModel {
  constructor() {
    this.styles = [];
  }

  addStyle = (selectorType, selectorTag) => {
    // #id, or .class
    const selector = `${selectorType === 'id' ? '#' : '.'}${selectorTag}`;
    this.styles.push({
      name: selectorTag,
      selector,
      props: {}
    });
  };

  addProperty = (property, value) => {
    // TODO: currently just adds to the first style
    this.styles[0].props[property] = value;
  };

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
}

export default CSSModel;
