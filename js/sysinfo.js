var si = require("systeminformation");
var os = require("os");
var i;
var j;
function transfer() {
    var _this = this;
    si.networkStats(function (data) {
        _this.tx = Math.ceil(data.tx_sec / Math.pow(2, 10));
        _this.rx = Math.ceil(data.rx_sec / Math.pow(2, 10));
        _this.tx = _this.tx.toString();
        _this.rx = _this.rx.toString();
        for (i = 0; i <= 3; i++) {
            if (_this.rx.length < i) {
                _this.rx = "0" + _this.rx;
            }
            if (_this.tx.length < i) {
                _this.tx = "0" + _this.tx;
            }
        }
        utils.show("tx", _this.tx + " KB");
        utils.show("rx", _this.rx + " KB");
    });
    setTimeout(transfer, 1000);
}
function user() {
    utils.append.div("base-info", "base-info", "container", "");
    utils.append.divSpan.span("username", "base-info-items", "base-info", "username: ", os.userInfo().username);
    utils.append.divSpan.span("hostname", "base-info-items", "base-info", "hostname: ", os.hostname());
    utils.append.divSpan.spanId("rx", "income", "base-info-items", "base-info", "in: ", "");
    utils.append.divSpan.spanId("tx", "outcome", "base-info-items", "base-info", "out: ", "");
}
;
var SystemInformation = /** @class */ (function () {
    function SystemInformation() {
        this.win = "Windows_NT;";
        console.log("system information is enabled");
    }
    SystemInformation.prototype.cpu = function () {
        var _this = this;
        utils.append.div("", "container-column", "container", "cpu");
        utils.append.div("container-column-cpu", "container-column", "container", "");
        utils.append.div("show-cpu", "container-show", "container-column-cpu", "");
        si.cpu(function (data) {
            utils.append.divSpan.span("brand", "show", "show-cpu", "Brand: ", data.brand);
            utils.append.divSpan.span("cores", "show", "show-cpu", "Cores No: ", data.cores);
            utils.append.divSpan.span("manufacturer", "show", "show-cpu", "Manufacturer: ", data.manufacturer);
            utils.append.divSpan.span("speed", "show", "show-cpu", "Cpu speed: ", data.speed);
            if (os.type() !== _this.win) {
                utils.append.divSpan.span("speedmax", "show", "show-cpu", "Cpu max speed: ", data.speedmax);
                utils.append.divSpan.span("speedmin", "show", "show-cpu", "Cpu min speed: ", data.speedmin);
            }
            utils.append.divSpan.span("vendor", "show", "show-cpu", "Vendor: ", data.vendor);
        });
    };
    SystemInformation.prototype.system = function () {
        utils.append.div("", "container-column", "container", "motherboard");
        utils.append.div("container-column-system", "container-column", "container", "");
        utils.append.div("show-system", "container-show", "container-column-system", "");
        si.baseboard(function (data) {
            utils.append.divSpan.span("manufacturer", "show", "show-system", "Manufacturer: ", data.manufacturer);
            utils.append.divSpan.span("model", "show", "show-system", "Model: ", data.model);
            utils.append.divSpan.span("serial", "show", "show-system", "S/N: ", data.serial);
            utils.append.divSpan.span("uuid", "show", "show-system", "uuid: ", data.uuid);
            utils.append.divSpan.span("version", "show", "show-system", "Version: ", data.version);
        });
    };
    SystemInformation.prototype.os = function () {
        utils.append.div("", "container-column", "container", "os");
        utils.append.div("container-column-os", "container-column", "container", "");
        utils.append.div("show-os", "container-show", "container-column-os", "");
        si.osInfo(function (data) {
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
    };
    SystemInformation.prototype.net = function () {
        utils.append.div("", "container-column", "container", "network");
        var mainArr = Object.values(os.networkInterfaces());
        var keyArr = Object.keys(os.networkInterfaces());
        utils.append.div("container-column-net", "container-column", "container", "");
        for (i = 0; i < mainArr.length; i++) {
            if (keyArr[i] !== "lo" && keyArr[i].length < 20) {
                utils.append.div("show-net-" + [i], "container-show", "container-column-net", "");
                utils.append.div(keyArr[i], "show", "show-net-" + [i], keyArr[i]);
            }
            for (j = 0; j < mainArr[i].length; j++) {
                var macUpperCase = mainArr[i][j].mac;
                macUpperCase = macUpperCase.toUpperCase();
                if (typeof mainArr[i][j] === "object" && mainArr[i][j].address !== "127.0.0.1" && 5 < mainArr[i][j].address.length && mainArr[i][j].address.length <= 16) {
                    utils.append.divSpan.span(keyArr[i] + "_ip", "show", "show-net-" + [i], "IP: ", mainArr[i][j].address);
                    utils.append.divSpan.span(keyArr[i] + "_mac", "show", "show-net-" + [i], "MAC: ", macUpperCase);
                }
            }
        }
    };
    SystemInformation.prototype.ram = function () {
        utils.append.div("", "container-column", "container", "ram");
        utils.append.div("container-column-ram", "container-column", "container", "");
        si.memLayout(function (data) {
            for (i = 0; i < data.length; i++) {
                utils.append.div("show-ram-" + [i], "container-show", "container-column-ram", "");
                utils.append.divSpan.span("size-" + [i], "show", "show-ram-" + [i], "Size: ", Math.ceil(data[i].size / Math.pow(2, 30)) + " GB");
                utils.append.divSpan.span("bank-" + [i], "show", "show-ram-" + [i], "Bank No: ", data[i].bank);
                utils.append.divSpan.span("type-" + [i], "show", "show-ram-" + [i], "Type: ", data[i].type);
                if (data[i].clockSpeed < 10) {
                    utils.append.divSpan.span("clockSpeed" + [i], "show", "show-ram-" + [i], "Clock Speed: ", data[i].clockSpeed);
                }
                utils.append.divSpan.span("formFactor-" + [i], "show", "show-ram-" + [i], "Form Factor: ", data[i].formFactor);
                utils.append.divSpan.span("manufacturer-" + [i], "show", "show-ram-" + [i], "Manufacturer: ", data[i].manufacturer);
                utils.append.divSpan.span("serialNum-" + [i], "show", "show-ram-" + [i], "S/N: ", data[i].serialNum);
                utils.append.divSpan.span("partNum-" + [i], "show", "show-ram-" + [i], "P/N: ", data[i].partNum);
            }
        });
    };
    SystemInformation.prototype.drive = function () {
        utils.append.div("", "container-column", "container", "drive");
        utils.append.div("container-column-drive", "container-column", "container", "");
        si.diskLayout(function (data) {
            for (i = 0; i < data.length; i++) {
                utils.append.div("show-drive-" + [i], "container-show", "container-column-drive", "");
                utils.append.divSpan.span("size-" + [i], "show", "show-drive-" + [i], "Size: ", Math.ceil(data[i].size / Math.pow(2, 30)) + " GB");
                utils.append.divSpan.span("name-" + [i], "show", "show-drive-" + [i], "Name: ", data[i].name);
                utils.append.divSpan.span("type-" + [i], "show", "show-drive-" + [i], "Type: ", data[i].type);
                utils.append.divSpan.span("interface-typ-" + [i], "show", "show-drive-" + [i], "Interface type: ", data[i].interfaceType);
                utils.append.divSpan.span("firmware-revision-" + [i], "show", "show-drive-" + [i], "Firmware revision: ", data[i].firmwareRevision);
                utils.append.divSpan.span("bytes-per-sector-" + [i], "show", "show-drive-" + [i], "Bytes Per Sector: ", data[i].bytesPerSector);
                utils.append.divSpan.span("serialNum-" + [i], "show", "show-drive-" + [i], "S/N: ", data[i].serialNum);
            }
        });
    };
    SystemInformation.prototype.gpu = function () {
        utils.append.div("", "container-column", "container", "gpu");
        utils.append.div("container-column-gpu", "container-column", "container", "");
        utils.append.div("", "container-column", "container", "displays");
        utils.append.div("container-column-displays", "container-column", "container", "");
        si.graphics(function (data) {
            for (i = 0; i < data.controllers.length; i++) {
                utils.append.div("show-gpu-controllers-" + [i], "container-show", "container-column-gpu", "");
                utils.append.divSpan.span("bus-" + [i], "show", "show-gpu-controllers-" + [i], "Bus: ", data.controllers[i].bus);
                utils.append.divSpan.span("model-" + [i], "show", "show-gpu-controllers-" + [i], "Model: ", data.controllers[i].model);
                utils.append.divSpan.span("vendor-" + [i], "show", "show-gpu-controllers-" + [i], "Vendor: ", data.controllers[i].vendor);
                utils.append.divSpan.span("vRam-" + [i], "show", "show-gpu-controllers-" + [i], "vRam: ", data.controllers[i].vRam);
                if (data.controllers.length % 2 == 1) {
                    utils.append.div("show-gpu-controllers" + [i + 1], "container-show", "container-column-gpu", "");
                }
            }
            for (i = 0; i < data.displays.length; i++) {
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
    };
    SystemInformation.prototype.user = function () {
        utils.append.div("", "container-column", "container", "users");
        utils.append.div("container-column-users", "container-column", "container", "");
        si.users(function (data) {
            for (i = 0; i < data.length; i++) {
                utils.append.div("show-users-" + [i], "container-show", "container-column-users", "");
                utils.append.divSpan.span("user-" + [i], "show", "show-users-" + [i], "User: ", data[i].user);
                utils.append.divSpan.span("date-" + [i], "show", "show-users-" + [i], "Loign date: ", data[i].date);
                utils.append.divSpan.span("time-" + [i], "show", "show-users-" + [i], "Login time: ", data[i].time);
                if (data[i].tty.length !== 0) {
                    utils.append.divSpan.span("tty-" + [i], "show", "show-users-" + [i], "tty: ", data[i].tty);
                }
            }
        });
    };
    return SystemInformation;
}());
var showInfo = {
    reset: function () {
        utils.reset(".show");
        utils.reset(".containerShon");
        utils.reset(".container-column");
        utils.reset(".container-stats");
        utils.reset(".container-stats-items");
    },
    show: {
        cpu: function () {
            showInfo.reset();
            sysInfo.cpu();
        },
        system: function () {
            showInfo.reset();
            sysInfo.system();
        },
        ram: function () {
            showInfo.reset();
            sysInfo.ram();
        },
        os: function () {
            showInfo.reset();
            sysInfo.os();
        },
        net: function () {
            showInfo.reset();
            sysInfo.net();
        },
        drive: function () {
            showInfo.reset();
            sysInfo.drive();
        },
        gpu: function () {
            showInfo.reset();
            sysInfo.gpu();
        },
        user: function () {
            showInfo.reset();
            sysInfo.user();
        },
        all: function () {
            showInfo.reset();
            sysInfo.cpu();
            setTimeout(sysInfo.system, 50);
            setTimeout(sysInfo.os, 100);
            setTimeout(sysInfo.net, 150);
            setTimeout(sysInfo.ram, 200);
            setTimeout(sysInfo.drive, 250);
            setTimeout(sysInfo.user, 300);
            setTimeout(sysInfo.gpu, 350);
        },
        stats: function () {
            var name = [
                buttonsName.pl[0], buttonsName.pl[2], buttonsName.pl[3], buttonsName.pl[5]
            ];
            var id = [
                buttonsId[0], buttonsId[2], buttonsId[3], buttonsId[5]
            ];
            showInfo.reset();
            console.log("stats enabled");
            utils.append.div("container-stats", "container-stats", "container", "");
            for (var i_1 in name) {
                utils.append.div("stat-" + id[i_1], "container-stats-items", "container-stats", "");
                utils.append.header.h2("", "", "stat-" + id[i_1], name[i_1]);
                utils.append.canvas("canvas-" + id[i_1], "stat-" + id[i_1]);
            }
        }
    }
};
var sysInfo = new SystemInformation();
