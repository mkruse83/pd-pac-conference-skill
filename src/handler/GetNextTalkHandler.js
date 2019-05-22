const profile = require("../helper/profile");
const callLambda = require("../helper/callLambda");

const compare = (a, b) => {
    if (a.from > b.from) {
        return 1;
    }
    if (b.from > a.from) {
        return -1;
    }
    return 0;
};

const formatRoom = (name) => {
    if (/^[0-9]+$/.test(name)) {
        return '<say-as interpret-as=\"digits\">' + name + '</say-as>'
    }
    if (/^[A-Z0-9]+$/.test(name)) {
        return '<say-as interpret-as=\"characters\">' + name + '</say-as>'
    }
    return name;
};

module.exports = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === "IntentRequest"
            && handlerInput.requestEnvelope.request.intent.name === "PAC_nextfavorite";
    },
    async handle(handlerInput) {
        let response = "Tut mir leid. Da ist was schief gelaufen.";
        try {
            const json = await profile(handlerInput.requestEnvelope.context.System.user.accessToken);
            console.log("INFO: found user: ", JSON.stringify(json, null, 2));
            const favs = await callLambda("getFavorites", {
                userId: json.user_id,
            });
            const now = new Date().getTime();
            const possibleFavs = favs.filter(fav => fav.from > now).sort(compare);
            let foundTalk;
            let foundConf;
            while (possibleFavs.length > 0) {
                const fav = possibleFavs.splice(0, 1)[0];
                const conf = await callLambda("getConferenceById", {
                    id: fav.conferencePartKey,
                    sortkey: fav.conferenceSortKey
                });
                if (conf) {
                    foundTalk = conf.talks.find(talk => talk.room.nameInLocation === fav.roomNameInLocation && talk.from === fav.from);
                    if (foundTalk) {
                        foundConf = conf;
                        break;
                    }
                }
            }
            if (foundTalk && foundConf) {
                const date = new Date(foundTalk.from);
                const formattedDate = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
                const formattedTime = '<say-as interpret-as=\"time\">' + date.getHours() + ":" + "".padStart(2, date.getMinutes()) + '</say-as>';

                const room = formatRoom(foundTalk.room.name);
                response = "Dein nächster Vortrag ist am " + formattedDate + " um " + formattedTime + " Uhr im Raum " + room + ". " +
                    "Der Vortrag heißt " + foundTalk.name + " auf der Konferenz " + foundConf.name +
                    ". Der Vortragende ist " + foundTalk.speaker.title + " " + foundTalk.speaker.name + ".";
            } else {
                response = "Du hast keine anstehenden Vorträge. Gehe doch in die App und suche dir neue Vorträge aus."
            }
        } catch (e) {
            console.log("ERROR: ", e.message, e.stack);
        }
        return handlerInput.responseBuilder
            .speak(response)
            .withShouldEndSession(true)
            .getResponse();
    }
};
