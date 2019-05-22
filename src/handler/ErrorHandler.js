module.exports = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log("ERROR: ", error.message, error.stack);

    return handlerInput.responseBuilder
      .speak("Tut mir leid. Das habe ich leider nicht verstanden.")
      .reprompt("Kannst du das bitte wiederholen oder anders formulieren?")
      .getResponse();
  }
};
