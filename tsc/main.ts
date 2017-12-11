window.onload = (): void => {
  user();
  transfer();
  buttons();
  time();
  clock();
  valueShow();
  transfer();
}

function buttons(): any {
  let j: number = 1;
  utils.append.div("buttons", "buttons", "container", "");
  for (let i = 0; i < buttonsId.length; i++) {
    utils.append.div(buttonsId[i], "btn", "buttons", buttonsName[j][i]);
  }
}

function time(): any {
  utils.append.div("timer", "time", "container", "");
  utils.append.div("date", "in_time", "timer", "");
  utils.append.div("time", "in_time", "timer", "");
  utils.append.div("day", "in_time", "timer", "");
}

function valueShow():any {
  utils.listen.click("cpu", showInfo.show.cpu);
  utils.listen.click("ram", showInfo.show.ram);
  utils.listen.click("mobo", showInfo.show.system);
  utils.listen.click("os", showInfo.show.os);
  utils.listen.click("all", showInfo.show.all);
  utils.listen.click("net", showInfo.show.net);
  utils.listen.click("drive", showInfo.show.drive);
  utils.listen.click("gpu", showInfo.show.gpu);
  utils.listen.click("users", showInfo.show.user);
  utils.listen.click("reset", showInfo.reset);
  utils.listen.click("stats", showInfo.show.stats);
}
