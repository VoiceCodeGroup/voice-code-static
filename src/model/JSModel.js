import codeFormatter from '../util/codeFormatter';

class JSModel {
  constructor() {
    // a section is a block of code
    // { }
    // including single statements
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

  //----------------------------------------------------------Actions-------------------------------------------//

  addClickListener = id => {
    this.codeSections.push({
      type: 'BLOCK',
      startString: `document.getElementById("${id}").addEventListener("click", function(){`,
      endString: `});`,
      childSections: []
    });
  };

  setProperty = (id, property, value) => {
    this.codeSections[0].childSections.push({
      type: 'STATEMENT',
      string: `document.getElementById("${id}").style.${property} = "${value}";`
    });
  };
}

export default JSModel;
