import codeFormatter from '../../util/codeFormatter';
import FunctionModel from './FunctionModel';
import SetStyleModel from './CodeSections/SetStyleModel';

class EventListenerModel {
  constructor(editorCallbacks, eventType) {
    this.editorCallbacks = editorCallbacks;
    this.eventType = eventType;
    this.targetID = '';
    this.callback = '';
    this.eventCallback = new FunctionModel();
    this.currentSection;
  }

  getTargetID = () => this.targetID;

  setTargetID = targetID => {
    this.targetID = targetID;
  };

  toString = () => {
    let codeString = `document.getElementById("${this.targetID}").addEventListener("${
      this.eventType
    }", ${this.eventCallback.toString()}); `;

    return codeString;
  };

  toFormattedString = async () => {
    const formattedJS = await codeFormatter(this.toString(), 'js');
    return formattedJS;
  };

  performAction = async ({ intent, params }, context) => {
    console.log('EVENT LISTENER action');
    if (!context[2]) {
      //      console.log(`Perform General ${intent} intent, params:`, params);
      await this[intent](params, context);
    } else {
      if (context[2] === 'codeSection') {
        this.currentSection.performAction({ intent, params }, context);
      }
    }
  };

  js_eventListener_setTargetID = ({ targetID }) => {
    console.log(`Setting target id to ${targetID}`);
    this.setTargetID(targetID);
  };

  js_eventListener_selectID = ({ targetID }) => {
    const setStyleSection = new SetStyleModel(this.editorCallbacks, targetID);
    this.eventCallback.addCodeSection(setStyleSection);
    this.currentSection = setStyleSection;
    this.editorCallbacks.updateContext(['js', 'createEventListener', 'codeSection']);
  };

  js_eventListener_finish = () => {
    console.log('Close event listener window');
    this.editorCallbacks.updateContext(['js']);
  };
}

export default EventListenerModel;
