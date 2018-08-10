import codeFormatter from '../../util/codeFormatter';

class FunctionModel {
  constructor(...args) {
    this.args = args;
    this.codeSections = [];
  }

  addCodeSection = codeSection => {
    this.codeSections.push(codeSection);
  };

  toString = () => {
    let codeString = 'function(';

    // function(arg1, arg2)
    this.args.forEach(arg => {
      codeString += `${arg},`;
    });

    codeString += `) {`;

    // function (arg1, arg2) {
    //    section 1
    //    section 2
    this.codeSections.forEach(section => {
      codeString += section.toString();
    });

    codeString += '}';

    return codeString;
  };

  toFormattedString = async () => {
    const formattedCode = await codeFormatter(this.toString(), 'js');
    return formattedCode;
  };
}

export default FunctionModel;
