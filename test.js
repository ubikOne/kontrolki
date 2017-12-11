const si = require("systeminformation");

si.networkStats((data) => {
  console.log(data);
});