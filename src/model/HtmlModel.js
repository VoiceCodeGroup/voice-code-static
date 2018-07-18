import codeFormatter from '../util/codeFormatter';
import ElementModel from './ElementModel';

class HtmlModel {
  constructor(update) {
    this.html = {
      children: [new ElementModel('div')]
    };

    this.ids = ['one', 'two', 'three', 'four', 'five'];
  }

  // turn a dom element into a string
  // first element is an empty dom node
  processElement = element => {
    let htmlString = '';
    let children = element.children;
    if (children) {
      children.forEach(child => {
        if (child.model.text) {
          htmlString += child.model.text;
        } else {
          htmlString += child.model.startString;
          if (child.children) {
            htmlString += this.processElement(child);
          }
          htmlString += child.model.endString;
        }
      });
    }

    return htmlString;
  };

  toString = async () => {
    const htmlString = this.processElement(this.html);
    console.log(htmlString);
    const formattedHTML = await codeFormatter(htmlString, 'html');
    return formattedHTML;
  };

  // Callback to complete an element create/update
  updateHTML = () => {};

  performAction = async ({ intent, params }, updateContext, context) => {
    console.log('HTML action');
    console.log(context);
    if (!context[1]) {
      if (this[intent]) {
        //
        console.log(`Perform HTML ${intent} intent, params:`, params);
        await this[intent](params, updateContext);
      }
    } else {
      if (context[1] === 'createElement') {
        await this.currentElement.performAction({ intent, params }, updateContext, context);
      }
    }
  };

  //----------------------------------------------------------Actions-------------------------------------------//

  // add an element to the 'dom' by pushing the created element
  createElement = ({ tag }, updateContext) => {
    console.log(`Create Element`);
    this.currentElement = new ElementModel(tag);
    console.log(this.html.children[0]);
    this.html.children[0].addChildElement(this.currentElement);
    console.log(this.html.children[0]);
    updateContext(['html', 'createElement']);
  };
}

export default HtmlModel;

// this.h(
//   'div',
//   { id: 'second' },
//   this.h('button', { id: 'button' }, this.h('text', { id: 'text' }, 'oh hello1'))
// )
