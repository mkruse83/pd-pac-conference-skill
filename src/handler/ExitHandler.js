module.exports = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      (handlerInput.requestEnvelope.request.intent.name ===
        "AMAZON.StopIntent" ||
        handlerInput.requestEnvelope.request.intent.name ===
          "AMAZON.CancelIntent")
    );
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder.speak("Bis bald.").getResponse();
  }
};
