export default class SpeechRecognition {
  constructor(onResult) {
    const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    //this.recognition.continuous = false;
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
