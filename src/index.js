const Alexa = require("ask-sdk-core");
const LogHandler = require("./handler/LogHandler");
const LaunchRequestHandler = require("./handler/LaunchRequestHandler");
const HelpHandler = require("./handler/HelpHandler");
const ExitHandler = require("./handler/ExitHandler");
const ErrorHandler = require("./handler/ErrorHandler");
const SessionEndedRequestHandler = require("./handler/SessionEndedRequestHandler");
const GetNextTalkHandler = require("./handler/GetNextTalkHandler");

const skillBuilder = Alexa.SkillBuilders.custom();
exports.handler = skillBuilder
    .addRequestHandlers(
        LogHandler,
        GetNextTalkHandler,
        LaunchRequestHandler,
        HelpHandler,
        ExitHandler,
        SessionEndedRequestHandler
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();
