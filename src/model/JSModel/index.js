import codeFormatter from '../../util/codeFormatter';

class JSModel {
  constructor(updateContext) {
    this.updateContext = updateContext;
    this.codeSections = [];
  }

  processSection = section => {
    let jsString = '';
    if (section.type === 'BLOCK') {
      // {
      jsString += section.startString;

      // {...}
      const { childSections } = section;
      if (childSections) {
        section.childSections.forEach(childSection => {
          jsString += this.processSection(childSection);
        });
      }

      // }
      jsString += section.endString;
    } else {
      jsString += section.string;
    }

    return jsString;
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

  // this.codeSections.push({
  //   type: 'BLOCK',
  //   startString: `document.getElementById("${id}").addEventListener("click", function(){`,
  //   endString: `});`,
  //   childSections: []
  // });
  //----------------------------------------------------------Actions-------------------------------------------//

  js_createClickListener = () => {
    const newEvent = new EventListener(updateContext, 'click');
    this.currentSection = newEvent;
    this.codeSections.push(newEvent);
  };

  setProperty = ({ id, property, value }) => {
    this.codeSections[0].childSections.push({
      type: 'STATEMENT',
      string: `document.getElementById("${id}").style.${property} = "${value}";`
    });
  };
}

export default JSModel;
