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
  statArr: any[];
  constructor() {
    console.log("system information is enabled");
  }
  cpu(): any {
    si.cpu((data) => {
      utils.append.div("show-cpu-key", "container-show", "container", "");
      utils.append.div("show-cpu-value", "container-show", "container", "");
      utils.append.div("brand-key", "show", "show-cpu-key", "Brand: ");
      utils.append.div("brand-value", "show", "show-cpu-value", data.brand);
      utils.append.div("cores-key", "show", "show-cpu-key", "Cores No: ");
      utils.append.div("cores-value", "show", "show-cpu-value", data.cores);
      utils.append.div("manufacturer-key", "show", "show-cpu-key", "Manufacturer: ");
      utils.append.div("manufacturer-value", "show", "show-cpu-value", data.manufacturer);
      utils.append.div("speed-key", "show", "show-cpu-key", "CPU current speed: ");
      utils.append.div("speed-value", "show", "show-cpu-value", data.speed);
      if (os.type() !== this.win) {
        utils.append.div("speedmax-key", "show", "show-cpu-key", "Cpu max speed: ");
        utils.append.div("speedmax-value", "show", "show-cpu-value", data.speedmax);
        utils.append.div("speedmin-key", "show", "show-cpu-key", "Cpu min speed: ");
        utils.append.div("speedmin-value", "show", "show-cpu-value", data.speedmin);
      }
      utils.append.div("vendor-key", "show", "show-cpu-key", "Vendor: ");
      utils.append.div("vendor-value", "show", "show-cpu-value", data.vendor);
    });
  }
  system(): any {
    si.baseboard((data) => {
      utils.append.div("show-system-key", "container-show", "container", "");
      utils.append.div("show-system-value", "container-show", "container", "");
      utils.append.div("manufacturer-key", "show", "show-system-key", "Manufacturer: ");
      utils.append.div("manufacturer-value", "show", "show-system-value", data.manufacturer);
      utils.append.div("model-key", "show", "show-system-key", "Model: ");
      utils.append.div("model-value", "show", "show-system-value", data.model);
      utils.append.div("serial-key", "show", "show-system-key", "S/N: ");
      utils.append.div("serial-value", "show", "show-system-value", data.serial);
      utils.append.div("uuid-key", "show", "show-system-key", "uuid: ");
      utils.append.div("uuid-value", "show", "show-system-value", data.uuid);
      utils.append.div("version-key", "show", "show-system-key", "Version: ");
      utils.append.div("version-value", "show", "show-system-value", data.version);
    });
  }
  os(): any {
    utils.append.div("", "container-column", "container", "os");
    utils.append.div("container-column-os", "container-column", "container", "");
    utils.append.div("show-os", "container-show", "container-column-os", "");
    si.osInfo((data) => {
      utils.append.divSpan.span("platform", "show", "show-os", "Platform: ", data.platform);
      if (data.distro.length > 25) {
        data.distro = data.distro.slice(0, 25);
        utils.append.divSpan.span("distro", "show", "show-os", "Distro: ", data.distro);
      }
      if (data.codename.length > 25) {
        data.codename = data.codename.slice(0, 25);
        if (data.distro !== data.codename) {
          utils.append.divSpan.span("codename", "show", "show-os", "Codename: ", data.codename);
        }
      }
      utils.append.divSpan.span("kernel", "show", "show-os", "Kernel: ", data.kernel);
      utils.append.divSpan.span("version", "show", "show-os", "Version: ", data.version);
    });
  }
  net(): any {
    utils.append.div("", "container-column", "container", "network");
    let mainArr: any[] = Object.values(os.networkInterfaces());
    let keyArr: string[] = Object.keys(os.networkInterfaces());
    utils.append.div("container-column-net", "container-column", "container", "");
    for (i in mainArr) {
      if (keyArr[i] !== "lo" && keyArr[i].length < 20) {
        utils.append.div("show-net-" + [i], "container-show", "container-column-net", "");
        utils.append.div(keyArr[i], "show", "show-net-" + [i], keyArr[i]);
      }
      for (j in mainArr[i]) {
        let macUpperCase: string = mainArr[i][j].mac;
        macUpperCase = macUpperCase.toUpperCase();
        if (typeof mainArr[i][j] === "object" && mainArr[i][j].address !== "127.0.0.1" && 5 < mainArr[i][j].address.length && mainArr[i][j].address.length <= 16) {
          utils.append.divSpan.span(keyArr[i] + "_ip", "show", "show-net-" + [i], "IP: ", mainArr[i][j].address);
          utils.append.divSpan.span(keyArr[i] + "_mac", "show", "show-net-" + [i], "MAC: ", macUpperCase);
        }
      }
    }
  }
  ram(): any {
    si.memLayout((data) => {
      for (i in data) {
        utils.append.div("show-ram-key" + [i], "container-show", "container", "");
        utils.append.div("show-ram-value" + [i], "container-show", "container", "");
        utils.append.div("size-key" + [i], "show", "show-ram-key" + [i], "Size: ");
        utils.append.div("size-value" + [i], "show", "show-ram-value" + [i], Math.ceil(data[i].size / Math.pow(2, 30)) + " GB");
        utils.append.div("bank-key" + [i], "show", "show-ram-key" + [i], "Bank No: ");
        utils.append.div("bank-value" + [i], "show", "show-ram-value" + [i], data[i].bank);
        utils.append.div("type-key" + [i], "show", "show-ram-key" + [i], "Type: ");
        utils.append.div("type-value" + [i], "show", "show-ram-value" + [i], data[i].type);
        if (data[i].clockSpeed < 10) {
          utils.append.div("clockSpeed-key" + [i], "show", "show-ram-key" + [i], "Clock speed: ");
          utils.append.div("clockSpeed-value" + [i], "show", "show-ram-value" + [i], data[i].clockSpeed);
        }
        utils.append.div("formFactor-key" + [i], "show", "show-ram-key" + [i], "Form Factor: ");
        utils.append.div("formFactor-value" + [i], "show", "show-ram-value" + [i], data[i].formFactor);
        utils.append.div("manufacturer-key" + [i], "show", "show-ram-key" + [i], "Manufacturer: ");
        utils.append.div("manufacturer-value" + [i], "show", "show-ram-value" + [i], data[i].manufacturer);
        utils.append.div("serialNum-key" + [i], "show", "show-ram-key" + [i], "S/n: ");
        utils.append.div("serialNum-value" + [i], "show", "show-ram-value" + [i], data[i].serialNum);
        utils.append.div("partNum-key" + [i], "show", "show-ram-key" + [i], "P/N: ");
        utils.append.div("partNum-value" + [i], "show", "show-ram-value" + [i], data[i].partNum);
      }
    });
  }
  drive(): any {
    si.diskLayout((data) => {
      for (i in data) {
        utils.append.div("show-drive-key" + [i], "container-show", "container", "");
        utils.append.div("show-drive-value" + [i], "container-show", "container", "");
        utils.append.div("size-key" + [i], "show", "show-drive-key" + [i], "Size: ");
        utils.append.div("size-value" + [i], "show", "show-drive-value" + [i], Math.ceil(data[i].size / Math.pow(2, 30)) + " GB");
        utils.append.div("name-key" + [i], "show", "show-drive-key" + [i], "Name: ");
        utils.append.div("name-value" + [i], "show", "show-drive-value" + [i], data[i].name);
        utils.append.div("type-key" + [i], "show", "show-drive-key" + [i], "Type: ");
        utils.append.div("type-value" + [i], "show", "show-drive-value" + [i], data[i].type);
        utils.append.div("interface-type-key" + [i], "show", "show-drive-key" + [i], "Interface type: ");
        utils.append.div("interface-type-value" + [i], "show", "show-drive-value" + [i], data[i].interfaceType);
        utils.append.div("firmware-revision-key" + [i], "show", "show-drive-key" + [i], "Firmware revision: ");
        utils.append.div("firmware-revision-value" + [i], "show", "show-drive-value" + [i], data[i].firmwareRevision);
        utils.append.div("bytes-per-sector-key" + [i], "show", "show-drive-key" + [i], "Bytes Per Sector: ");
        utils.append.div("bytes-per-sector-value" + [i], "show", "show-drive-value" + [i], data[i].bytesPerSector);
        utils.append.div("serial-num-key" + [i], "show", "show-drive-key" + [i], "S/N: ");
        utils.append.div("serial-num-value" + [i], "show", "show-drive-value" + [i], data[i].serialNum);
      }
    });
  }
  gpu(): any {
    utils.append.div("", "container-column", "container", "gpu");
    utils.append.div("container-column-gpu", "container-column", "container", "");
    utils.append.div("", "container-column", "container", "displays");
    utils.append.div("container-column-displays", "container-column", "container", "");
    si.graphics((data) => {
      for (i in data.controllers) {
        utils.append.div("show-gpu-controllers-" + [i], "container-show", "container-column-gpu", "");
        utils.append.divSpan.span("bus-" + [i], "show", "show-gpu-controllers-" + [i], "Bus: ", data.controllers[i].bus);
        utils.append.divSpan.span("model-" + [i], "show", "show-gpu-controllers-" + [i], "Model: ", data.controllers[i].model);
        utils.append.divSpan.span("vendor-" + [i], "show", "show-gpu-controllers-" + [i], "Vendor: ", data.controllers[i].vendor);
        utils.append.divSpan.span("vRam-" + [i], "show", "show-gpu-controllers-" + [i], "vRam: ", data.controllers[i].vRam);
        if (data.controllers.length % 2 == 1) {
          utils.append.div("show-gpu-controllers" + [i + 1], "container-show", "container-column-gpu", "")
        }
      }
      for (i in data.displays) {
        utils.append.div("show-gpu-displays-" + [i], "container-show", "container-column-displays", "");
        if (data.displays[i].connetion != 0) {
          utils.append.divSpan.span("connetion-" + [i], "show", "show-gpu-displays-" + [i], "Connetion: ", data.displays[i].connetion);
        }
        utils.append.divSpan.span("model-" + [i], "show", "show-gpu-displays-" + [i], "Model: ", data.displays[i].model);
        utils.append.divSpan.span("pixel-depth-" + [i], "show", "show-gpu-displays-" + [i], "Pixel depth: ", data.displays[i].pixeldepth);
        utils.append.divSpan.span("resolution-x-" + [i], "show", "show-gpu-displays-" + [i], "Pixel width: ", data.displays[i].resolutionx);
        utils.append.divSpan.span("resolution-y-" + [i], "show", "show-gpu-displays-" + [i], "Pixel height: ", data.displays[i].resolutiony);
      }
    });
  }
  user(): any {
    utils.append.div("", "container-column", "container", "users");
    utils.append.div("container-column-users", "container-column", "container", "");
    si.users((data) => {
      for (i in data) {
        utils.append.div("show-users-" + [i], "container-show", "container-column-users", "");
        utils.append.divSpan.span("user-" + [i], "show", "show-users-" + [i], "User: ", data[i].user);
        utils.append.divSpan.span("date-" + [i], "show", "show-users-" + [i], "Loign date: ", data[i].date);
        utils.append.divSpan.span("time-" + [i], "show", "show-users-" + [i], "Login time: ", data[i].time);
        if (data[i].tty.length !== 0) {
          utils.append.divSpan.span("tty-" + [i], "show", "show-users-" + [i], "tty: ", data[i].tty);
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