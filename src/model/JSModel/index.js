import codeFormatter from '../../util/codeFormatter';
import EventListenerModel from './EventListenerModel';

class JSModel {
  constructor(editorCallbacks) {
    this.editorCallbacks = editorCallbacks;
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

  js_createClickListener = () => {
    // Update context which opens event listener dialog
    const newEvent = new EventListenerModel(this.editorCallbacks, 'click');
    this.currentSection = newEvent;
    this.codeSections.push(newEvent);
    this.editorCallbacks.updateContext(['js', 'createEventListener']);
  };

  setProperty = ({ id, property, value }) => {
    this.codeSections[0].childSections.push({
      type: 'STATEMENT',
      string: `document.getElementById("${id}").style.${property} = "${value}";`
    });
  };
}

export default JSModel;
