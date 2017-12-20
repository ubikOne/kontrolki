const si = require("systeminformation");

si.cpu((data) => {
  console.log(data.length);
});