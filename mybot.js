const Discord = require("discord.js");
var auth = require('./auth.json');
const client = new Discord.Client();

var fatechart = [
    null,
    [[0, -20, 77], [0, 0, 81], [1, 5, 82], [1, 5, 82], [2, 10, 83], [4, 20, 85], [5, 25, 86], [9, 45, 90], [10, 50, 91], [11, 55, 92], [16, 80, 97]],
    [[0, 0, 81], [1, 5, 82], [1, 5, 82], [2, 10, 83], [3, 15, 84], [5, 25, 86], [7, 35, 88], [10, 50, 91], [11, 55, 92], [13, 65, 94], [16, 85, 97]],
    [[0, 0, 81], [1, 5, 82], [2, 10, 83], [3, 15, 84], [5, 25, 86], [9, 45, 90], [10, 50, 91], [13, 65, 94], [15, 75, 96], [16, 80, 97], [18, 90, 99]],
    [[1, 5, 82], [2, 10, 83], [3, 15, 84], [4, 20, 85], [7, 35, 88], [10, 50, 91], [11, 55, 92], [15, 75, 96], [16, 80, 97], [16, 85, 97], [19, 95, 100]],
    [[1, 5, 82], [3, 15, 84], [5, 25, 86], [7, 35, 88], [10, 50, 91], [13, 65, 94], [15, 75, 96], [16, 85, 97], [18, 90, 99], [18, 90, 99], [19, 95, 100]],
    [[2, 10, 83], [5, 25, 86], [9, 45, 90], [10, 50, 91], [13, 65, 94], [16, 80, 97], [16, 85, 97], [18, 90, 99], [19, 95, 100], [19, 95, 100], [20, 100, 0]],
    [[3, 15, 84], [7, 35, 88], [10, 50, 91], [11, 55, 92], [15, 75, 96], [16, 85, 97], [18, 90, 99], [19, 95, 100], [19, 95, 100], [19, 95, 100], [20, 100, 0]],
    [[5, 25, 86], [10, 50, 91], [13, 65, 94], [15, 75, 96], [16, 85, 97], [18, 90, 99], [19, 95, 100], [19, 95, 100], [20, 100, 0], [22, 110, 0], [26, 130, 0]],
    [[10, 50, 91], [15, 75, 96], [16, 85, 97], [18, 90, 99], [19, 95, 100], [19, 95, 100], [20, 100, 0], [21, 105, 0], [23, 115, 0], [25, 125, 0], [26, 145, 0]]
];

function say(string, message) {
    console.log("OUT: '" + string + "'");
    message.channel.send(string);
}

client.on("ready", () => {
    console.log("I am ready!");
});

client.on("message", (message) => {
    var strmessage = message.content;
    var re = /.*\?(( \w+){1,3}) (\d)/g;
    var found = re.exec(strmessage);
    if(!found) {
        return;
    }
    console.log("--------");
    found[2] = found[3] //removes repeated data
    found[1] = found[1].toLowerCase(); //case insensitive
    var rand = Math.floor(Math.random() * 100) + 1; //random number between 1 and 100

    console.log(parseInt(found[2]))
    var X = parseInt(found[2]);
    var Y;

    if (X == 0) {
        return;
    }

    switch (found[1]) {
        case " impossible":
            Y = 0;
            break;
        case " no way":
            Y = 1;
            break;
        case " very unlikely":
            Y = 2;
            break;
        case " unlikely":
            Y = 3;
            break;
        case " fifty fifty":
            Y = 4;
            break;
        case "somewhat likely":
            Y = 5;
            break;
        case " likely":
            Y = 6;
            break;
        case " very likely":
            Y = 7;
            break;
        case " near sure thing":
            Y = 8;
            break;
        case " a sure thing":
            Y = 9;
            break;
        case " has to be":
            Y = 10;
            break;
        default:
            return;
    }

    console.log(X, Y);
    var odds = fatechart[X][Y];

    if (rand <= odds[0]) {
        say("Odds: " + odds + " Roll: " + rand + " Result: **Exceptional Yes**", message);
    }
    else if (rand <= odds[1]) {
        say("Odds: " + odds + " Roll: " + rand + " Result: **Yes**", message);
    }
    else if (rand < odds[2]) {
        say("Odds: " + odds + " Roll: " + rand + " Result: **No**", message);
    }
    else {
        say("Odds: " + odds + " Roll: " + rand + " Result: **Exceptional No**", message);
    }

    if (rand % 11 == 0 && rand / 11 <= X) {
        var rand = Math.floor(Math.random() * 11);
        var event = "";
        switch (rand) {
            case 0:
                event = "Remote event";
                break;
            case 1:
                event = "NPC action";
                break;
            case 2:
                event = "Introduce a new NPC";
                break;
            case 3:
                event = "Move toward a thread";
                break;
            case 4:
                event = "Move away from a thread";
                break;
            case 5:
                event = "Close a thread";
                break;
            case 6:
                event = "PC negative";
                break;
            case 7:
                event = "PC positive";
                break;
            case 8:
                event = "Ambiguous event";
                break;
            case 9:
                event = "NPC negative";
                break;
            case 10:
                event = "NPC positive";
                break;
        }
        say("Something unexpected has occurred! It is a: " + event, message);
    }
});

client.login(auth.token);