# Decode
A web-based application that offers users the ability to develop code using natural voice commands

To install Decode:
1. Clone this repository
2. Navigate to the local repository
3. Run `npm install`
4. Run `npm start`
5. Open the Google Chrome Browser
6. Navigate to the URL `localhost:3001`
7. Enjoy

# Architecture
Front-End Technologies
- React
- Google's Material UI style framework

Notable third-party libraries used
- Ace Editor
- Mozilla's Web Speech API built into Chrome
- Google's Dialogflow

Supplementary Servers
- Code formatter using Prettier.js, hosted by Heroku
  - Refer to VoiceCodeGroup/code-formatter repository 
- Dialogflow - Decode, hosted by Heroku
  - Refer to VoiceCodeGroup/dialogflow-service repository

