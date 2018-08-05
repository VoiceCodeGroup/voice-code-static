class StyleModel {
  constructor(updateContext, id) {
    this.updateContext = updateContext;

    this.selectorType = '';
    this.selectorValue = '';
    this.properties = {};
  }

  performAction = async ({ intent, params }, context) => {
    console.log('Style action');
    if (this[intent]) {
      await this[intent](params, context);
    }
  };

  setSelectorType = ({ selectorType }) => {
    this.selectorType = selectorType;
  };

  setSelectorValue = ({ selectorValue }) => {
    this.selectorValue = this.selectorValue;
  };

  addProperty = ({ property, value }) => {
    this.properties[property] = value;
  };
}

export default StyleModel;
