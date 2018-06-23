class Model {
  constructor() {
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
    this.state = { ...this.state, html: `${this.state.html} <${element}>hello1</${element}>` };
  };

  getVals = () => {
    return {
      html: this.state.html,
      css: this.state.css,
      js: this.state.js
    };
  };

  performAction = ({ intent, params }) => {
    console.log('Perform', intent, params);
    this[intent](...params);
    return this.getVals();
  };
}

export default Model;
