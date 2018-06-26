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

  toString() {
    let cssString = '';

    // Create each style
    // #id {}
    this.styles.forEach(style => {
      cssString = `${cssString}${style.selector} {`;

      // add each property e.g. width: 100px
      Object.entries(style.props).map(prop => {
        cssString += `${prop.name}: ${propvalue};`;
      });

      cssString += '}';

      console.log('CSS STRING', cssString);
    });
  }
}

export default CSSModel;
