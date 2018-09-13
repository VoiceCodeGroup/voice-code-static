import codeFormatter from '../../util/codeFormatter';

class ElementModel {
  constructor(editorCallbacks, tag, props = {}, children = []) {
    this.model = this.h(tag, props, children);
    this.editorCallbacks = editorCallbacks;
  }

  // Create an element
  h = (tag, props = {}, children = []) => {
    // Text is a special case as it has no enclosing tags and no children
    if (tag === 'text') {
      return { tag: 'text', text: children[0] };
    }
    const tagStrings = this.constructTagStrings(tag, props);

    return { tag, props, ...tagStrings, children };
  };

  // Construct <div> and </div> strings
  constructTagStrings = (tag, props = {}) => {
    const selfEnding = tag === 'input';
    let startString = `<${tag}`;
    Object.entries(props).map(prop => {
      startString += ` ${prop[0]}="${prop[1]}"`;
    });

    startString += selfEnding ? '/>' : '>';
    const endString = selfEnding ? ':' : `</${tag}>`;
    return { startString, endString };
  };

  getProps = () => {
    return this.model.props;
  };

  getID = () => this.getProps().id;

  getTag = () => {
    return this.model.tag;
  };

  getStartString = () => {
    return this.model.startString;
  };

  getEndString = () => {
    return this.model.endString;
  };

  getChildren = () => {
    return this.model.children;
  };

  isText = () => {
    return this.model.text && true;
  };

  getText = () => {
    return this.model.text;
  };

  // If element has text inside it
  getTextProp = () => {
    return this.model.textProp;
  };

  // turn a dom element into a string
  // first element is an empty dom node
  processElement = element => {
    let htmlString = '';
    if (element.isText()) {
      htmlString += element.getText();
    } else {
      htmlString += element.getStartString();

      if (element.getChildren()) {
        element.getChildren().forEach(child => {
          htmlString += `\n  ${this.processElement(child)}`;
        });
      }

      console.log('HTML STRING', htmlString);
      if (element.getChildren()) {
        htmlString += `${element.getEndString()}`;
      } else {
        htmlString += `${element.getEndString()}`;
      }
    }

    return htmlString;
  };

  toString = async () => {
    const htmlString = this.processElement(this);

    const formattedHTML = await codeFormatter(htmlString, 'html');
    return formattedHTML;
  };

  updateModel = (tag, props = {}, children = []) => {
    this.model = this.h(tag, props, children);
  };

  performAction = async ({ intent, params }, context) => {
    console.log('ELEMENT action');
    if (this[intent]) {
      //      console.log(`Perform General ${intent} intent, params:`, params);
      await this[intent](params, context);
    }
  };

  //----------------------------------------------------------Actions-------------------------------------------//
  html_element_setElementProperty = ({ property, value }) => {
    console.log(`Setting ${property} ${value}`);
    const currentProps = this.model.props;
    const newProps = { ...currentProps, [property]: value };
    this.updateModel(this.getTag(), newProps, this.getChildren());
    console.log('new model', this.model);
  };

  html_element_setText = ({ text }) => {
    console.log('IN intent');
    const textElement = new ElementModel(this.editorCallbacks, 'text', {}, [text]);
    this.model.children.push(textElement);
    this.model.textProp = text;
  };

  addChildElement = element => {
    this.model.children.push(element);
  };

  removeChildElement = child => {
    const childID = child.getID();
    const newChildren = this.model.children.filter(child => {
      const id = child.getProps().id;
      return id !== childID;
    });

    this.updateModel(this.getTag(), this.getProps(), newChildren);
  };

  html_element_finish = () => {
    this.editorCallbacks.updateContext(['html']);
  };
}

export default ElementModel;
