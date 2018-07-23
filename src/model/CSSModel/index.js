import codeFormatter from '../../util/codeFormatter';

class CSSModel {
  constructor() {
    this.styles = [];
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

  //----------------------------------------------------------Actions-------------------------------------------//

  createStyle = ({ id }) => {
    // TODO
    const selectorType = 'id';
    const selectorTag = id;
    console.log(`Creating an ${selectorType} style for ${selectorTag}`);
    // #id, or .class
    const selector = `${selectorType === 'id' ? '#' : '.'}${selectorTag}`;
    this.styles.push({
      name: selectorTag,
      selector,
      props: {}
    });
  };

  addProperty = ({ property, value }) => {
    // TODO: currently just adds to the first style
    this.styles[0].props[property] = value;
  };
}

export default CSSModel;
