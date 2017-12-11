function clock() {
    var date;
    var day;
    var month;
    var monthNameDisplay;
    var year;
    var hour;
    var min;
    var sec;
    var currentDay;
    var monthName;
    var weekday;
    date = new Date();
    day = date.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    ;
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
    }
    ;
    min = date.getMinutes();
    if (min < 10) {
        min = "0" + min;
    }
    ;
    sec = date.getSeconds();
    if (sec < 10) {
        sec = "0" + sec;
    }
    ;
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
