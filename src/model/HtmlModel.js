import codeFormatter from '../util/codeFormatter';
import ElementModel from './ElementModel';

class HtmlModel {
  constructor() {
    this.html = {
      children: [this.h('div', { id: 'root' })]
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
        if (child.text) {
          htmlString += child.text;
        } else {
          htmlString += child.startString;
          if (child.children) {
            htmlString += this.processElement(child);
          }
          htmlString += child.endString;
        }
      });
    }

    return htmlString;
  };

  // Create an element
  h = (tag, props, ...children) => {
    // Text is a special case as it has no enclosing tags and no children
    if (tag === 'text') {
      return { tag: 'text', text: children[0] };
    }
    const tagStrings = this.constructTagStrings(tag, props);

    return { tag, props, ...tagStrings, children };
  };

  // Construct <div> and </div> strings
  constructTagStrings = (tag, props) => {
    const selfEnding = tag === 'input';
    let startString = `<${tag} `;
    Object.entries(props).map(prop => {
      startString += `${prop[0]}="${prop[1]}"`;
    });

    startString += selfEnding ? '/>' : '>';
    const endString = selfEnding ? ':' : `</${tag}>`;
    return { startString, endString };
  };

  toString = async () => {
    const htmlString = this.processElement(this.html);
    const formattedHTML = await codeFormatter(htmlString, 'html');
    return formattedHTML;
  };

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
    updateContext(['html', 'createElement']);

    // const id = this.ids.pop();
    // this.html.children[0].children.push(this.h(tag, { id }, this.h('text', null, 'oh hello1')));
  };
}

export default HtmlModel;

// this.h(
//   'div',
//   { id: 'second' },
//   this.h('button', { id: 'button' }, this.h('text', { id: 'text' }, 'oh hello1'))
// )
