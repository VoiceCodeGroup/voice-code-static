export default text => {
  const synth = window.speechSynthesis;
  if (synth.speaking) {
    console.error('speechSynthesis.speaking');
    return;
  }

  const voices = synth.getVoices();

  if (text !== '') {
    const utterThis = new SpeechSynthesisUtterance(text);
    utterThis.voice = voices[4];
    utterThis.pitch = 1;
    utterThis.rate = 1;
    synth.speak(utterThis);
  }
};
