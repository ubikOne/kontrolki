function clock(): any {

  let date: any;
  let day: any;
  let month: any;
  let monthNameDisplay: any;
  let year: any;
  let hour: any;
  let min: any;
  let sec: any;
  let currentDay: any;

  let monthName: string[];
  let weekday: string[];

  date = new Date();

  day = date.getDate();
    if (day < 10) {
      day = "0" + day;
    };

  month = date.getMonth();

  monthName = [
    "Stycznia",
    "Lutego",
    "Marca",
    "Kwietnia",
    "Maja",
    "Czerwca",
    "Lipca",
    "Sierpnia",
    "Września",
    "Października",
    "Listopada",
    "Grudnia"
  ];

  monthNameDisplay = monthName[month];

  year = date.getFullYear();

  hour = date.getHours();
    if (hour < 10) {
      hour = "0" + hour;
    };
  min = date.getMinutes();
    if (min < 10) {
      min = "0" + min;
    };
  sec = date.getSeconds();
    if (sec < 10) {
      sec = "0" + sec;
    };

  weekday = [
    "Niedziela",
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota"
  ];

  currentDay = weekday[date.getDay()];

  document.getElementById("date").innerHTML = day + " " + monthNameDisplay + " " + year;
  document.getElementById("time").innerHTML = hour + ":" + min + ":" + sec;
  document.getElementById("day").innerHTML = currentDay;

  setTimeout(clock, 1000);
}