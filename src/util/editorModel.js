class Model {
  constructor() {
    this.actions = {
      html: {
        insert: {
          createElement: this.createElement
        }
      },
      css: {
        insert: {
          createElementStyle: this.createElementStyle
        }
      },
      js: {},
      all: {}
    };

    this.state = {
      html: '',
      css: '',
      js: '',
      previousState: [],
      inFocus: 'html'
    };
  }
  createElement = element => {
    console.log('Creating element: ' + element);
  };

  createElementStyle = element => {};

  performAction = (actionContext, actionType, actionIntent, params) => {
    console.log(
      this.actions[actionContext ? this.state.inFocus : 'all'][actionType][actionIntent](...params)
    );
  };
}

export default new Model();
