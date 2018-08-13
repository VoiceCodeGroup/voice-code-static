import codeFormatter from '../../../util/codeFormatter';

class SetStyleModel {
  constructor(editorCallbacks, targetID) {
    this.editorCallbacks = editorCallbacks;
    this.targetID = targetID;
    this.code = {
      styles: {},
      text: undefined,
      class: {
        add: [],
        remove: [],
        toggle: []
      }
    };
  }

  getTargetID = () => this.targetID;

  setTargetID = targetID => {
    this.targetID = targetID;
  };

  toString = () => {
    let variable = `element${this.targetID}`;
    let codeString = `const ${variable} = document.getElementById("${this.targetID}")`;

    // Styles
    Object.entries(this.code.styles).forEach(([property, value]) => {
      codeString += `\n${variable}.style.${property} = "${value}"`;
    });

    // Text
    if (this.code.text) {
      codeString += `\n${variable}.innerHTML = "${this.code.text}"`;
    }

    this.code.class.add.forEach(className => {
      codeString += `\n${variable}.classList.add("${className}")`;
    });

    this.code.class.remove.forEach(className => {
      codeString += `\n${variable}.classList.remove("${className}")`;
    });

    this.code.class.toggle.forEach(className => {
      codeString += `\n${variable}.classList.toggle("${className}")`;
    });

    codeString;

    return codeString;
  };

  toFormattedString = async () => {
    const formattedCode = await codeFormatter(this.toString(), 'js');
    return formattedCode;
  };

  performAction = async ({ intent, params }, context) => {
    console.log('Set Style JS action');
    if (this[intent]) {
      //      console.log(`Perform General ${intent} intent, params:`, params);
      await this[intent](params, context);
    }
  };

  js_eventListener_codeSection_setStyle = ({ property, value }) => {
    console.log(`Setting ${property} to ${value}`);
    this.code.styles[property] = value;
  };

  js_eventListener_codeSection_addClass = ({ className }) => {
    console.log(`Adding class ${className}`);
    this.code.class.add.push(className);
  };

  js_eventListener_codeSection_removeClass = ({ className }) => {
    console.log(`Removing class ${className}`);
    this.code.class.remove.push(className);
  };

  js_eventListener_codeSection_toggleClass = ({ className }) => {
    console.log(`Toggling class ${className}`);
    this.code.class.toggle.push(className);
  };

  js_eventListener_codeSection_setText = ({ text }) => {
    console.log(`Setting text to ${text}`);
    this.code.text = text;
  };

  js_eventListener_codeSection_finish = () => {
    console.log('Close set style window');
    this.editorCallbacks.updateContext(['js', 'createEventListener']);
  };
}

export default SetStyleModel;
