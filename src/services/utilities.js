let S4 = function () {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};

function* values(obj) {
  for (let prop of Object.keys(obj)) // own properties, you might use
    // for (let prop in obj)
    yield obj[prop];
}

let methods = {

  newGuid: function () {
    return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
  },
  arrayFrom: function (obj) {
    return Array.from(values(obj));
  }

};

export default methods;
