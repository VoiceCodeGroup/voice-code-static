import codeFormatter from '../../util/codeFormatter';
import ElementModel from './ElementModel';

class HTMLModel {
  constructor(updateContext) {
    this.html = {
      root: new ElementModel(updateContext, 'div', { id: 'root' })
    };
    this.updateContext = updateContext;
  }

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
          htmlString += this.processElement(child);
        });
      }

      htmlString += element.getEndString();
    }

    return htmlString;
  };

  toString = async () => {
    const htmlString = this.processElement(this.html.root);

    const formattedHTML = await codeFormatter(htmlString, 'html');
    return formattedHTML;
  };

  getElementByID = id => {
    const stack = [this.html.root];
    const found = [];
    while (stack.length > 0) {
      let v = stack.pop();
      let currentID = v.getProps().id;
      if (currentID === id) {
        return v;
      }

      if (!found.includes(currentID)) {
        found.push(currentID);
        v.getChildren().forEach(child => {
          stack.push(child);
        });
      }
    }

    return false;
  };

  removeElementByID = id => {
    const stack = [this.html.root];
    const found = [];
    let element;
    while (stack.length > 0) {
      let currentElement = stack.pop();
      let currentID = currentElement.getProps().id;
      console.log('Current Element', currentElement);

      if (!found.includes(currentID)) {
        found.push(currentID);
        currentElement.getChildren().forEach(child => {
          let childID = child.getProps().id;
          if (childID === id) {
            console.log('Parent before removing child', currentElement);
            currentElement.removeChildElement(child);
            console.log('Parent after removing child', currentElement);
            element = child;
          }
          stack.push(child);
        });
      }
    }

    console.log('ELEMENT', element);
    return element;
  };

  performAction = async ({ intent, params }, context) => {
    console.log('HTML action');
    if (!context[1]) {
      if (this[intent]) {
        //
        console.log(`Perform HTML ${intent} intent, params:`, params);
        await this[intent](params);
      }
    } else {
      if (context[1] === 'createElement') {
        await this.currentElement.performAction({ intent, params }, context);
      }
    }
  };

  //----------------------------------------------------------Actions-------------------------------------------//

  // add an element to the 'dom' by pushing the created element
  createElement = ({ tag }) => {
    console.log(`Create Element`);
    this.currentElement = new ElementModel(this.updateContext, tag);
    this.html.root.addChildElement(this.currentElement);
    console.log('ADDED CHILD', this.html.root);
    this.updateContext(['html', 'createElement']);
  };

  // id, id = child, parent to be nested under
  nestElement = ({ childID, parentID }) => {
    console.log(`Nest element ${childID} under ${parentID}`);
    console.log('ADDED CHILD', this.html.root);
    const child = this.removeElementByID(childID);
    this.getElementByID(parentID).addChildElement(child);
  };
}

export default HTMLModel;

// this.h(
//   'div',
//   { id: 'second' },
//   this.h('button', { id: 'button' }, this.h('text', { id: 'text' }, 'oh hello1'))
// )
