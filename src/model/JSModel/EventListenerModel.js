import codeFormatter from '../../util/codeFormatter';

class JSModel {
  constructor(updateContext, eventType) {
    this.updateContext = updateContext;
    this.eventType = eventType;
    this.targetID = '';
    this.callback = '';
  }

  setTargetID = targetID => {
    this.targetID = targetID;
  };
  
  toString = () => {
    let codeString = `document.getElementById("${this.targetID}").addEventListener("${this.eventType}", function(){`;
    codeString += '})';

    return codeString
  }

  toFormattedString = () => {
    const formattedJS = await codeFormatter(this.toString(), 'js');
    return formattedJS;
  }
  
}

export default JSModel;
