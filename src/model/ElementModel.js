import codeFormatter from '../util/codeFormatter';

class ElementModel {
  constructor(tag) {
    this.element = this.h(tag);
  }

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
  constructTagStrings = (tag, props = {}) => {
    const selfEnding = tag === 'input';
    let startString = `<${tag} `;
    Object.entries(props).map(prop => {
      startString += `${prop[0]}="${prop[1]}"`;
    });

    startString += selfEnding ? '/>' : '>';
    const endString = selfEnding ? ':' : `</${tag}>`;
    return { startString, endString };
  };

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

  toString = async () => {
    const htmlString = this.processElement(this.html);
    const formattedHTML = await codeFormatter(htmlString, 'html');
    return formattedHTML;
  };

  //----------------------------------------------------------Actions-------------------------------------------//
  setProperty = () => {};
}

export default ElementModel;