export default class SpeechRecognition {
  constructor(onResult, toggleListening, isListening) {
    const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    const SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
    this.recognition = new SpeechRecognition();
    this.endListening = false;
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
      // console.log("starting again");
      // this.recognition.start();
    };

    this.recognition.onend = () => {
      console.log("end listening is : " + this.endListening);
      if(!this.endListening){
        console.log("so resetting");
        this.recognition.start();
      }
    };
    this.recognition.onnomatch = () => {
      diagnostic.textContent = "I didn't recognise that color.";
    };

    this.recognition.onerror = event => {
      toggleListening;
      diagnostic.textContent = 'Error occurred in this.recognition: ' + event.error;
    };
  }

  finish = () => {
    this.endListening = true;
    this.recognition.stop();
  };

  start = () => {
    this.endListening = false;
    this.recognition.start();
  };
}
