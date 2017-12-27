const si = require("systeminformation");
const os = require("os");

let i: any;
let j: any;

function transfer(): any {
  si.networkStats((data) => {
    this.tx = Math.ceil(data.tx_sec / Math.pow(2, 10));
    this.rx = Math.ceil(data.rx_sec / Math.pow(2, 10));
    this.tx = this.tx.toString();
    this.rx = this.rx.toString();
    for (i = 0; i <= 3; i++) {
      if (this.rx.length < i) {
        this.rx = "0" + this.rx;
      }
      if (this.tx.length < i) {
        this.tx = "0" + this.tx;
      }
    }
    utils.show("tx", this.tx + " KB");
    utils.show("rx", this.rx + " KB");
  });
  setTimeout(transfer, 1000)
}
function user(): any {
  utils.append.div("base-info", "base-info", "body", "");
  utils.append.divSpan.span("username", "base-info-items", "base-info", "username: ", os.userInfo().username);
  utils.append.divSpan.span("hostname", "base-info-items", "base-info", "hostname: ", os.hostname());
  utils.append.divSpan.spanId("rx", "income", "base-info-items", "base-info", "in: ", "");
  utils.append.divSpan.spanId("tx", "outcome", "base-info-items", "base-info", "out: ", "");
};

class SystemInformation {
  win: string = "Windows_NT"
  linux: string = "linux"
  statArr: any[];
  constructor() {
    console.log("system information is enabled");
  }
  cpu(): any {
    si.cpu((data) => {
      utils.append.div("show-cpu-key", "container-show-key", "container", "");
      utils.append.div("show-cpu-value", "container-show-value", "container", "");
      utils.append.div("brand-key", "show-key", "show-cpu-key", "Brand: ");
      utils.append.div("brand-value", "show-value", "show-cpu-value", data.brand);
      utils.append.div("cores-key", "show-key", "show-cpu-key", "Cores No: ");
      utils.append.div("cores-value", "show-value", "show-cpu-value", data.cores);
      utils.append.div("manufacturer-key", "show-key", "show-cpu-key", "Manufacturer: ");
      utils.append.div("manufacturer-value", "show-value", "show-cpu-value", data.manufacturer);
      utils.append.div("speed-key", "show-key", "show-cpu-key", "CPU current speed: ");
      utils.append.div("speed-value", "show-value", "show-cpu-value", data.speed);
      if (os.type() !== this.win) {
        utils.append.div("speedmax-key", "show-key", "show-cpu-key", "Cpu max speed: ");
        utils.append.div("speedmax-value", "show-value", "show-cpu-value", data.speedmax);
        utils.append.div("speedmin-key", "show-key", "show-cpu-key", "Cpu min speed: ");
        utils.append.div("speedmin-value", "show-value", "show-cpu-value", data.speedmin);
      }
      utils.append.div("vendor-key", "show-key", "show-cpu-key", "Vendor: ");
      utils.append.div("vendor-value", "show-value", "show-cpu-value", data.vendor);
    });
  }
  system(): any {
    si.baseboard((data) => {
      utils.append.div("show-system-key", "container-show-key", "container", "");
      utils.append.div("show-system-value", "container-show-value", "container", "");
      utils.append.div("manufacturer-key", "show-key", "show-system-key", "Manufacturer: ");
      utils.append.div("manufacturer-value", "show-value", "show-system-value", data.manufacturer);
      utils.append.div("model-key", "show-key", "show-system-key", "Model: ");
      utils.append.div("model-value", "show-value", "show-system-value", data.model);
      utils.append.div("serial-key", "show-key", "show-system-key", "S/N: ");
      utils.append.div("serial-value", "show-value", "show-system-value", data.serial);
      utils.append.div("uuid-key", "show-key", "show-system-key", "uuid: ");
      utils.append.div("uuid-value", "show-value", "show-system-value", data.uuid);
      utils.append.div("version-key", "show-key", "show-system-key", "Version: ");
      utils.append.div("version-value", "show-value", "show-system-value", data.version);
    });
  }
  os(): any {
    si.osInfo((data) => {
      utils.append.div("show-os-key", "container-show-key", "container", "");
      utils.append.div("show-os-value", "container-show-value", "container", "");
      utils.append.div("platform-key", "show-key", "show-os-key", "Platform: ");
      utils.append.div("platform-value", "show-value", "show-os-value", data.platform);
      if (data.distro.length > 25) {
        data.distro = data.distro.slice(0, 25);
        utils.append.div("distro-key", "show-key", "show-os-key", "Distro: ");
        utils.append.div("distro-value", "show-value", "show-os-value", data.distro);
      }
      if (data.codename.length > 25) {
        data.codename = data.codename.slice(0, 25);
        if (data.distro !== data.codename) {
          utils.append.div("codename-key", "show-key", "show-os-key", "Codename: ");
          utils.append.div("codename-value", "show-value", "show-os-value", data.codename);
        }
      }
      utils.append.div("kernel-key", "show-key", "show-os-key", "Kernel: ");
      utils.append.div("kernel-value", "show-value", "show-os-value", data.kernel);
      utils.append.div("version-key", "show-key", "show-os-key", "Version: ");
      utils.append.div("version-value", "show-value", "show-os-value", data.version);
    });
  }
  net(): any {
    let mainArr: any[] = Object.values(os.networkInterfaces());
    let keyArr: string[] = Object.keys(os.networkInterfaces());
    for (i = 1; i < mainArr.length; i++) {
      utils.append.div("show-net-key" + [i], "container-show-key", "container", "");
      utils.append.div("show-net-value" + [i], "container-show-value", "container", "");
      if (keyArr[i] !== "lo" && keyArr[i].length < 20) {
        utils.append.div(keyArr[i] + "-key", "show-key", "show-net-key" + [i], "Network name: ");
        utils.append.div(keyArr[i] + "-value", "show-value", "show-net-value" + [i], keyArr[i]);
      }
      for (j in mainArr[i]) {
        let macUpperCase: string = mainArr[i][j].mac;
        macUpperCase = macUpperCase.toUpperCase();
        if (typeof mainArr[i][j] === "object" && mainArr[i][j].address !== "127.0.0.1" && 5 < mainArr[i][j].address.length && mainArr[i][j].address.length <= 16) {
          utils.append.div("ip-key-" + keyArr[i], "show-key", "show-net-key" + [i], "IP: ");
          utils.append.div("ip-value-" + keyArr[i], "show-value", "show-net-value" + [i], mainArr[i][j].address);
          utils.append.div("mac-key-" + keyArr[i], "show-key", "show-net-key" + [i], "MAC: ");
          utils.append.div("mac-value-" + keyArr[i], "show-value", "show-net-value" + [i], macUpperCase);
        }
      }
    }
  }
  ram(): any {
    si.memLayout((data) => {
      for (i in data) {
        utils.append.div("show-ram-key" + [i], "container-show-key", "container", "");
        utils.append.div("show-ram-value" + [i], "container-show-value", "container", "");
        utils.append.div("size-key" + [i], "show-key", "show-ram-key" + [i], "Size: ");
        utils.append.div("size-value" + [i], "show-value", "show-ram-value" + [i], Math.ceil(data[i].size / Math.pow(2, 30)) + " GB");
        utils.append.div("bank-key" + [i], "show-key", "show-ram-key" + [i], "Bank No: ");
        utils.append.div("bank-value" + [i], "show-value", "show-ram-value" + [i], data[i].bank);
        utils.append.div("type-key" + [i], "show-key", "show-ram-key" + [i], "Type: ");
        utils.append.div("type-value" + [i], "show-value", "show-ram-value" + [i], data[i].type);
        if (data[i].clockSpeed < 10) {
          utils.append.div("clockSpeed-key" + [i], "show-key", "show-ram-key" + [i], "Clock speed: ");
          utils.append.div("clockSpeed-value" + [i], "show-value", "show-ram-value" + [i], data[i].clockSpeed);
        }
        utils.append.div("formFactor-key" + [i], "show-key", "show-ram-key" + [i], "Form Factor: ");
        utils.append.div("formFactor-value" + [i], "show-value", "show-ram-value" + [i], data[i].formFactor);
        utils.append.div("manufacturer-key" + [i], "show-key", "show-ram-key" + [i], "Manufacturer: ");
        utils.append.div("manufacturer-value" + [i], "show-value", "show-ram-value" + [i], data[i].manufacturer);
        utils.append.div("serialNum-key" + [i], "show-key", "show-ram-key" + [i], "S/n: ");
        utils.append.div("serialNum-value" + [i], "show-value", "show-ram-value" + [i], data[i].serialNum);
        utils.append.div("partNum-key" + [i], "show-key", "show-ram-key" + [i], "P/N: ");
        utils.append.div("partNum-value" + [i], "show-value", "show-ram-value" + [i], data[i].partNum);
      }
    });
  }
  drive(): any {
    si.diskLayout((data) => {
      for (i in data) {
        utils.append.div("show-drive-key" + [i], "container-show-key", "container", "");
        utils.append.div("show-drive-value" + [i], "container-show-value", "container", "");
        utils.append.div("size-key" + [i], "show-key", "show-drive-key" + [i], "Size: ");
        utils.append.div("size-value" + [i], "show-value", "show-drive-value" + [i], Math.ceil(data[i].size / Math.pow(2, 30)) + " GB");
        utils.append.div("name-key" + [i], "show-key", "show-drive-key" + [i], "Name: ");
        utils.append.div("name-value" + [i], "show-value", "show-drive-value" + [i], data[i].name);
        utils.append.div("type-key" + [i], "show-key", "show-drive-key" + [i], "Type: ");
        utils.append.div("type-value" + [i], "show-value", "show-drive-value" + [i], data[i].type);
        utils.append.div("interface-type-key" + [i], "show-key", "show-drive-key" + [i], "Interface type: ");
        utils.append.div("interface-type-value" + [i], "show-value", "show-drive-value" + [i], data[i].interfaceType);
        utils.append.div("firmware-revision-key" + [i], "show-key", "show-drive-key" + [i], "Firmware revision: ");
        utils.append.div("firmware-revision-value" + [i], "show-value", "show-drive-value" + [i], data[i].firmwareRevision);
        utils.append.div("bytes-per-sector-key" + [i], "show-key", "show-drive-key" + [i], "Bytes Per Sector: ");
        utils.append.div("bytes-per-sector-value" + [i], "show-value", "show-drive-value" + [i], data[i].bytesPerSector);
        utils.append.div("serial-num-key" + [i], "show-key", "show-drive-key" + [i], "S/N: ");
        utils.append.div("serial-num-value" + [i], "show-value", "show-drive-value" + [i], data[i].serialNum);
      }
    });
  }
  gpu(): any {
    si.graphics((data) => {
      for (i in data.controllers) {
        utils.append.div("show-gpu-controllers-key" + [i], "container-show-key", "container", "");
        utils.append.div("show-gpu-controllers-value" + [i], "container-show-value", "container", "");
        utils.append.div("model-key" + [i], "show-key", "show-gpu-controllers-key" + [i], "model: ");
        utils.append.div("model-value" + [i], "show-value", "show-gpu-controllers-value" + [i], data.controllers[i].model);
        utils.append.div("vendor-key" + [i], "show-key", "show-gpu-controllers-key" + [i], "vendor: ");
        utils.append.div("vendor-value" + [i], "show-value", "show-gpu-controllers-value" + [i], data.controllers[i].vendor);
        if (data.controllers[i].bus.length != 0) {
          utils.append.div("bus-key" + [i], "show-key", "show-gpu-controllers-key" + [i], "bus: ");
          utils.append.div("bus-value" + [i], "show-value", "show-gpu-controllers-value" + [i], data.controllers[i].bus);
        }
        utils.append.div("vRam-key" + [i], "show-key", "show-gpu-controllers-key" + [i], "vRam: ");
        utils.append.div("vRam-value" + [i], "show-value", "show-gpu-controllers-value" + [i], data.controllers[i].vram);
        utils.append.div("vRam-key" + [i], "show-key", "show-gpu-controllers-key" + [i], "Dynamic vRam: ");
        utils.append.div("vRam-value" + [i], "show-value", "show-gpu-controllers-value" + [i], data.controllers[i].vramDynamic);
      }
      for (i in data.displays) {
        utils.append.div("show-gpu-displays-key" + [i], "container-show-key", "container", "");
        utils.append.div("show-gpu-displays-value" + [i], "container-show-value", "container", "");
        if (data.displays[i].main === true) {
          utils.append.div("main-key" + [i], "show-key", "show-gpu-displays-key" + [i], "main: ");
          utils.append.div("main-value" + [i], "show-value", "show-gpu-displays-value" + [i], data.displays[i].main);
        }
        if (data.displays[i].builtin === true) {
          utils.append.div("builtin-key" + [i], "show-key", "show-gpu-displays-key" + [i], "builtin: ");
          utils.append.div("builtin-value" + [i], "show-value", "show-gpu-displays-value" + [i], data.displays[i].builtin);
        }
        utils.append.div("connection-key" + [i], "show-key", "show-gpu-displays-key" + [i], "connection: ");
        utils.append.div("connection-value" + [i], "show-value", "show-gpu-displays-value" + [i], data.displays[i].connection);
        if (data.displays[i].model.length != 0) {
          utils.append.div("model-key" + [i], "show-key", "show-gpu-displays-key" + [i], "model: ");
          utils.append.div("model-value" + [i], "show-value", "show-gpu-displays-value" + [i], data.displays[i].model);
        }
        utils.append.div("pixel-depth--key" + [i], "show-key", "show-gpu-displays-key" + [i], "Pixel depth: ");
        utils.append.div("pixel-depth--value" + [i], "show-value", "show-gpu-displays-value" + [i], data.displays[i].pixeldepth);
        utils.append.div("connetion-key" + [i], "show-key", "show-gpu-displays-key" + [i], "Pixel width: ");
        utils.append.div("connetion-value" + [i], "show-value", "show-gpu-displays-value" + [i], data.displays[i].resolutionx);
        utils.append.div("resolution-x-" + [i], "show-key", "show-gpu-displays-key" + [i], "Pixel height: ");
        utils.append.div("resolution-y-" + [i], "show-value", "show-gpu-displays-value" + [i], data.displays[i].resolutiony);
      }
    });
  }
  user(): any {
    si.users((data) => {
      for (i in data) {
        utils.append.div("show-users-key" + [i], "container-show-key", "container", "");
        utils.append.div("show-users-value" + [i], "container-show-value", "container", "");
        utils.append.div("user-key" + [i], "show-key", "show-users-key" + [i], "User: ");
        utils.append.div("user-value" + [i], "show-value", "show-users-value" + [i], data[i].user);
        utils.append.div("date-key" + [i], "show-key", "show-users-key" + [i], "Loign date: ");
        utils.append.div("date-value" + [i], "show-value", "show-users-value" + [i], data[i].date);
        utils.append.div("time-key" + [i], "show-key", "show-users-key" + [i], "Login time: ");
        utils.append.div("time-value" + [i], "show-value", "show-users-value" + [i], data[i].time);
        if (data[i].tty.length !== 0) {
          utils.append.div("tty-key" + [i], "show-key", "show-users-key" + [i], "tty: ");
          utils.append.div("tty-value" + [i], "show-value", "show-users-value" + [i], data[i].tty);
        }
      }
    });
  }
}

let showInfo: any = {
  reset: () => {
    utils.reset(".show");
    utils.reset(".containerShon");
    utils.reset(".container-column");
    utils.reset(".container-stats");
    utils.reset(".container-stats-items");
  },
  show: {
    cpu: () => {
      showInfo.reset();
      sysInfo.cpu();
    },
    system: () => {
      showInfo.reset();
      sysInfo.system();
    },
    ram: () => {
      showInfo.reset();
      sysInfo.ram();
    },
    os: () => {
      showInfo.reset();
      sysInfo.os()
    },
    net: () => {
      showInfo.reset();
      sysInfo.net();
    },
    drive: () => {
      showInfo.reset();
      sysInfo.drive();
    },
    gpu: () => {
      showInfo.reset();
      sysInfo.gpu();
    },
    user: () => {
      showInfo.reset();
      sysInfo.user();
    },
    all: () => {
      showInfo.reset();
      sysInfo.cpu();
      setTimeout(sysInfo.system, 50);
      setTimeout(sysInfo.ram, 100);
      setTimeout(sysInfo.net, 150);
      setTimeout(sysInfo.os, 200);
      setTimeout(sysInfo.drive, 250);
      setTimeout(sysInfo.user, 300);
      setTimeout(sysInfo.gpu, 350);
    },
    stats: () => {
      let name: string[] = [
        buttonsName.pl[0], buttonsName.pl[2], buttonsName.pl[3], buttonsName.pl[5]
      ];
      let id: string[] = [
        buttonsId[0], buttonsId[2], buttonsId[3], buttonsId[5]
      ]
      showInfo.reset();
      console.log("stats enabled")
      utils.append.div("container-stats", "container-stats", "container", "");
      for (i in name) {
        utils.append.div("stat-" + id[i], "container-stats-items", "container-stats", "");
        utils.append.header.h2("", "", "stat-" + id[i], name[i])
        utils.append.canvas("canvas-" + id[i], "stat-" + id[i])
      }
    }
  }
}

let sysInfo: any = new SystemInformation();