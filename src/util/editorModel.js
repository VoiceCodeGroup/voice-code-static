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
    this.setState({ html: `${this.state.html} <${element}></${element}` });
  };

  performAction = (actionIntent, params) => {
    console.log('Perform', actionIntent, params);
    console.log(this[actionIntent]);
    console.log(this[actionIntent](params.tag.stringValue));
  };
}

export default Model;
