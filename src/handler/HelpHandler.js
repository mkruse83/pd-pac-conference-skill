module.exports = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "AMAZON.HelpIntent"
    );
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak("Du kannst mich fragen welcher Talk der nächste ist, den du in der App markiert hast." +
          "Sage dafür einfach: Alexa, frage den Pack nach meinen nächsten Vortrag.")
      .getResponse();
  }
};
