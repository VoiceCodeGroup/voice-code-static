import codeFormatter from '../../../util/codeFormatter';

class SetStyleModel {
  constructor(editorCallbacks, targetID) {
    this.editorCallbacks = editorCallbacks;
    this.targetID = targetID;
    this.style = {};
  }

  getTargetID = () => this.targetID;

  setTargetID = targetID => {
    this.targetID = targetID;
  };

  toString = () => {
    let codeString = `document.getElementById("${this.targetID}")`;

    if (this.style.property) {
      codeString += `.style.${this.style.property} = "${this.style.value}"`;
    }

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
    this.style.property = property;
    this.style.value = value;
  };

  js_eventListener_codeSection_finish = () => {
    console.log('Close set style window');
    this.editorCallbacks.updateContext(['js', 'createEventListener']);
  };
}

export default SetStyleModel;
