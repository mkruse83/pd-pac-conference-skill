module.exports = {
  canHandle(handlerInput) {
    console.log('INFO: handler input', JSON.stringify(handlerInput, null, 2));
    return false;
  },
  handle() {}
};
