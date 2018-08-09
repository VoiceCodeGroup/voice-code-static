import codeFormatter from '../../util/codeFormatter';
import EventListenerModel from './EventListenerModel';

class JSModel {
  constructor(updateContext) {
    this.updateContext = updateContext;
    this.codeSections = [];
  }

  processSection = section => {
    return section.toString();
  };

  toString = async () => {
    let js = '';
    this.codeSections.forEach(section => {
      js += this.processSection(section);
    });

    console.log('JS', js);

    const formattedJS = await codeFormatter(js, 'js');
    return formattedJS;
  };

  performAction = async ({ intent, params }, context) => {
    console.log('JS action');
    if (!context[1]) {
      if (this[intent]) {
        //
        console.log(`Perform JS ${intent} intent, params:`, params);
        await this[intent](params);
      }
    } else {
      if (context[1] === 'createEventListener') {
        await this.currentSection.performAction({ intent, params }, context);
      }
    }
  };

  //----------------------------------------------------------Actions-------------------------------------------//

  //to create new event listener
  //create new function here corresponding to event type
  //follow template of createClickListener
  //in dialogflow add new intent for event type
  js_createClickListener = () => {
    const newEvent = new EventListenerModel(this.updateContext, 'click');
    this.currentSection = newEvent;
    this.codeSections.push(newEvent);
    this.updateContext(['js', 'createEventListener']);
  };

  js_createMouseOutListener = () => {
    const newEvent = new EventListenerModel(this.updateContext, 'mouseout');
    this.currentSection = newEvent;
    this.codeSections.push(newEvent);
    this.updateContext(['js', 'createEventListener']);
  };

  js_createChangeListener = () => {
    const newEvent = new EventListenerModel(this.updateContext, 'change');
    this.currentSection = newEvent;
    this.codeSections.push(newEvent);
    this.updateContext(['js', 'createEventListener']);
  };

  js_createKeyPressListener = () => {
    const newEvent = new EventListenerModel(this.updateContext, 'keypress');
    this.currentSection = newEvent;
    this.codeSections.push(newEvent);
    this.updateContext(['js', 'createEventListener']);
  };

  js_createMouseOverListener = () => {
    const newEvent = new EventListenerModel(this.updateContext, 'mouseover');
    this.currentSection = newEvent;
    this.codeSections.push(newEvent);
    this.updateContext(['js', 'createEventListener']);
  };

  setProperty = ({ id, property, value }) => {
    this.codeSections[0].childSections.push({
      type: 'STATEMENT',
      string: `document.getElementById("${id}").style.${property} = "${value}";`
    });
  };
}

export default JSModel;
