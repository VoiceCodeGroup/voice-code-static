import codeFormatter from '../../util/codeFormatter';
import ElementModel from './ElementModel';

class HTMLModel {
  constructor(editorCallbacks) {
    this.html = {
      root: new ElementModel(editorCallbacks, 'div', { id: 'root' })
    };

    this.editorCallbacks = editorCallbacks;
  }

  // turn a dom element into a string
  // first element is an empty dom node
  processElement = (element, level) => {
    let htmlString = '';
    let space = '';
    for (let i = 0; i < level; i++) {
      space += '  ';
    }

    if (element.isText()) {
      htmlString += element.getText();
    } else {
      htmlString += space + element.getStartString();

      if (element.getChildren()) {
        element.getChildren().forEach(child => {
          htmlString += `\n${this.processElement(child, level + 1)}`;
        });
      }

      if (element.getChildren().length > 0) {
        htmlString += `\n${space}${element.getEndString()}`;
      } else {
        htmlString += `${element.getEndString()}`;
      }
    }

    return htmlString;
  };

  toString = async () => {
    const htmlString = this.processElement(this.html.root, 0);

    // const formattedHTML = await codeFormatter(htmlString, 'html');
    return htmlString;
  };

  // Use DFS to find an elemetn
  getElementByID = id => {
    const stack = [this.html.root];
    const found = [];
    while (stack.length > 0) {
      let v = stack.pop();
      let currentID = v.getProps().id;
      if (currentID === id) {
        return v;
      }

      console.log(found);
      if (!found.includes(currentID)) {
        found.push(currentID);
        v.getChildren().forEach(child => {
          stack.push(child);
        });
      }
    }

    return false;
  };

  // Use DFS to remove element from parent
  removeElementByID = id => {
    const stack = [this.html.root];
    const found = [];
    let element;
    while (stack.length > 0) {
      let currentElement = stack.pop();
      let currentID = currentElement.getProps().id;

      if (!found.includes(currentID)) {
        found.push(currentID);
        currentElement.getChildren().forEach(child => {
          let childID = child.getProps().id;
          if (childID === id) {
            currentElement.removeChildElement(child);
            element = child;
          }
          stack.push(child);
        });
      }
    }

    return element;
  };

  performAction = async ({ intent, params }, context) => {
    console.log('HTML action');
    console.log('context', context);

    // If the context is only level 1
    if (!context[1]) {
      if (this[intent]) {
        //
        console.log(`Perform HTML ${intent} intent, params:`, params);
        await this[intent](params);
      }
    } else {
      // Pass action to createElement context
      if (context[1] === 'createElement') {
        await this.currentElement.performAction({ intent, params }, context);
      }
    }
  };

  //----------------------------------------------------------Actions-------------------------------------------//

  // add an element to the 'dom' by pushing the created element
  html_createElement = ({ tag }) => {
    console.log(`Create Element`);
    this.currentElement = new ElementModel(this.editorCallbacks, tag);
    this.html.root.addChildElement(this.currentElement);
    this.editorCallbacks.updateContext(['html', 'createElement']);
  };

  // id, id = child, parent to be nested under
  html_nestElement = ({ childID, parentID }) => {
    console.log(`Nest element ${childID} under ${parentID}`);

    if (childID === 'root') {
      this.editorCallbacks.handleError(`Cannot nest 'root' element`);
      return;
    }

    // remove child from current postion
    const child = this.removeElementByID(childID);

    // handle error
    if (!child) {
      this.editorCallbacks.handleError(`Child ID '${childID}' not found`);
      return;
    }

    const parent = this.getElementByID(parentID);

    //handle error
    if (!parent) {
      this.editorCallbacks.handleError(`Parent ID '${parentID}' not found`);
      return;
    }
    // nest child in parent
    parent.addChildElement(child);
  };

  // id, id = child, parent to be nested under
  html_deleteElement = ({ id }) => {
    console.log(`Delete element ${id}`);

    if (id === 'root') {
      this.editorCallbacks.handleError(`Cannot delete 'root' element`);
      return;
    }

    // remove child from current postion
    const element = this.removeElementByID(id);

    // handle error
    if (!element) {
      this.editorCallbacks.handleError(`Element '${id}' not found`);
      return;
    }
  };

  html_openPreview = () => {
    this.editorCallbacks.openPreview();
  };

  html_closePreview = () => {
    this.editorCallbacks.closePreview();
  };

  html_openHelp = () => {
    this.editorCallbacks.openHelp();
  };

  html_closeHelp = () => {
    this.editorCallbacks.closeHelp();
  };
}

export default HTMLModel;
