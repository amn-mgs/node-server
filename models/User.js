// To parse this data:
//
//   const Convert = require("./file");
//
//   const user = Convert.toUser(json);

// Converts JSON strings to/from your types
function toUser(json) {
    return JSON.parse(json);
}

function userToJson(value) {
    return JSON.stringify(value);
}
module.exports = {
    "userToJson": userToJson,
    "toUser": toUser,
};
