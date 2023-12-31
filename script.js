function add(acc, x) {
    return acc + x;
}

function main() {

    // generated by gen_counts.py:
    var COUNTS_BY_DAY = [1603, 2791, 889, 2904, 2125, 2585, 307, 2097, 2741, 899, 2043, 2494, 2291, 1869, 369, 388, 105, 2233, 1931, 909, 1587, 2423, 343, 1500, 1042, 1588, 2014, 1723, 1736, 2471];

    var today = new Date();
    if (today.getMonth() > 10 || today.getFullYear() > 2023) {
        document.getElementById("day-summary").innerText = "NaNoRiVal 2023 is over! Did you win??";
        document.getElementById("cumulative-summary").remove()
        document.getElementById("progress-bar").remove()
        return;
    }

    var dayIndex = today.getDate() - 1;
    if (today.getHours() < 18) {
        // Keel wants each day's number to appear no sooner than 6pm.
        today.setDate(today.getDate() - 1);
        dayIndex -= 1;
    }

    if (dayIndex < 0) {
        document.getElementById("day-summary").innerText = "Your rival hasn't started yet, check back later!";
        document.getElementById("cumulative-summary").remove()
        document.getElementById("progress-bar").remove()
        return;
    }

    var todaysNumber = COUNTS_BY_DAY[dayIndex];
    var sumSoFar = COUNTS_BY_DAY.slice(0, dayIndex + 1).reduce(add, 0);

    document.getElementById("day").innerText = today.toLocaleDateString('en-us', { weekday: "long", month: "short", day: "numeric" });
    document.getElementById("num-words-today").innerText = todaysNumber.toLocaleString("en-us");
    document.getElementById("num-words-cumulative").innerText = sumSoFar.toLocaleString("en-us");


    var progressBarWidth = 800 * (sumSoFar / 50000);
    document.getElementById("inner").style.width = progressBarWidth + "px";
}
