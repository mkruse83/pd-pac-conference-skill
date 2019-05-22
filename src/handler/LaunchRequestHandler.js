module.exports = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === "LaunchRequest";
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak(
                "Hallo. Ich bin der Pack Konferenzhelfer. Ich kann dir sagen wann dein nächster Vortrag ist, "+
                "den du in der zugehörigen App maakiert hast. Frage mich dazu einfach nach deinem nächsten Vortrag."
            )
            .reprompt("Wie kann ich dir helfen?")
            .getResponse();
    }
};
