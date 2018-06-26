export default class SpeechRecognition {
  constructor(onResult) {
    const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    const SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
    this.recognition = new SpeechRecognition();
    var commands = ['create a div element as a child of the element with id bravo'];
    var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + commands.join(' | ') + ' ;';

    var speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    this.recognition.grammars = speechRecognitionList;
    this.recognition.continuous = false;
    this.recognition.lang = 'en-US';
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;

    this.recognition.onresult = onResult;
    this.recognition.onspeechend = () => {
      this.recognition.stop();
    };

    this.recognition.onnomatch = () => {
      diagnostic.textContent = "I didn't recognise that color.";
    };

    this.recognition.onerror = event => {
      diagnostic.textContent = 'Error occurred in this.recognition: ' + event.error;
    };
  }

  start = () => {
    this.recognition.start();
  };
}
