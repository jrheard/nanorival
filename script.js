function add(acc, x) {
    return acc + x;
}

function main() {

    // generated by gen_counts.py:
    var COUNTS_BY_DAY = [1603, 1396, 1280, 1995, 1617, 1331, 1787, 2072, 1769, 1953, 1337, 1517, 2177, 1903, 1345, 1471, 2160, 2014, 1568, 1884, 1155, 1787, 1238, 1320, 1279, 1506, 1660, 2423, 1248, 2205];

    var today = new Date();
    var dayIndex;
    if (today.getMonth() > 10 || today.getFullYear() > 2023) {
        dayIndex = 30;
        document.getElementById("day-summary").innerText = "NaNoRiVal 2023 is over! Did you win??";
        document.getElementById("cumulative-summary").remove()
        document.getElementById("progress-bar").remove()
    } else {
        dayIndex = today.getDate() - 1;
        if (today.getHours() < 22) {
            // Keel wants each day's number to appear no sooner than 10pm.
            dayIndex -= 1;
        }
    }

    var todaysNumber, sumSoFar;
    if (dayIndex < 0) {
        todaysNumber = 0;
        sumSoFar = 0;
        document.getElementById("day-summary").innerText = "Your rival hasn't started yet, check back later!";
        document.getElementById("cumulative-summary").remove()
        document.getElementById("progress-bar").remove()
        return;
    }

    todaysNumber = COUNTS_BY_DAY[dayIndex];
    sumSoFar = COUNTS_BY_DAY.slice(0, dayIndex + 1).reduce(add, 0);

    document.getElementById("day").innerText = today.toLocaleDateString('en-us', { weekday: "long", month: "short", day: "numeric" });
    document.getElementById("num-words-today").innerText = todaysNumber.toLocaleString("en-us");
    document.getElementById("num-words-cumulative").innerText = sumSoFar.toLocaleString("en-us");


    var progressBarWidth = 800 * (sumSoFar / 50000);
    document.getElementById("inner").style.width = progressBarWidth + "px";
}