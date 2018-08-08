import codeFormatter from '../../util/codeFormatter';

class EventListenerModel {
  constructor(updateContext, eventType) {
    this.updateContext = updateContext;
    this.eventType = eventType;
    this.targetID = '';
    this.callback = '';
  }

  getTargetID = () => this.targetID;

  setTargetID = targetID => {
    this.targetID = targetID;
  };

  toString = () => {
    let codeString = `document.getElementById("${this.targetID}").addEventListener("${
      this.eventType
    }", function(){`;
    codeString += '})';

    return codeString;
  };

  toFormattedString = async () => {
    const formattedJS = await codeFormatter(this.toString(), 'js');
    return formattedJS;
  };

  performAction = async ({ intent, params }, context) => {
    console.log('EVENT LISTENER action');
    if (this[intent]) {
      //      console.log(`Perform General ${intent} intent, params:`, params);
      await this[intent](params, context);
    }
  };

  js_eventListener_setTargetID = ({ targetID }) => {
    console.log(`Setting target id to ${targetID}`);
    this.setTargetID(targetID);
  };
}

export default EventListenerModel;
