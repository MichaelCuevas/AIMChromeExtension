"use strict";

function sortDOM() {
  // Grabs the test info table from the HTML
  let x = document.getElementById(
    "ctl00_ctl00_MainContent_CphMainContent_TaskDuJour_Grid"
  );

  // If the test table doesn't exist, there are no tests that day
  if (x === null) {
    return;
  }
  // Grabs the rows from the table and counts the number of rows
  x = document.getElementById(
    "ctl00_ctl00_MainContent_CphMainContent_TaskDuJour_Grid"
  ).rows;
  let x_len = x.length;
  let n = 0;
  // moves completed tests to the bottom of the table and keeps track of how many are complete
  for (let i = x_len - 1; i >= 1; i--) {
    if (
      x[i].cells[1].innerText.includes("Completed") ||
      x[i].cells[1].innerText.includes("No Show")
    ) {
      x[i].parentNode.insertBefore(x[i], x[x_len - n]);
      n += 1;
    }
  }

  // calculates the amount of time until the end of each test and stores this time into a dictionary
  let timesDict = {};
  for (let j = 1; j < x_len - n; j++) {
    // calculates the amount of time until the test ends for each test
    let times = x[j].cells[10].innerText;
    let endTime = times.split(" ")[3];
    let pm_am = times.split(" ")[4];
    let timeObj = new Date();
    let currDate = timeObj.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: false
    });
    let differenceHour = parseInt(endTime.split(":")[0]);
    // since endTime is in 12 hour format, must convert to 24h format if time is past 12:59 PM
    if (pm_am === "PM" && differenceHour !== 12) {
      differenceHour =
        parseInt(endTime.split(":")[0]) + 12 - parseInt(currDate.split(":")[0]);
    } else {
      differenceHour =
        parseInt(endTime.split(":")[0]) - parseInt(currDate.split(":")[0]);
    }
    let differenceMinute =
      parseInt(endTime.split(":")[1]) - parseInt(currDate.split(":")[1]);
    timesDict[x[j].cells[7].innerText] = differenceHour * 60 + differenceMinute;
  }

  // sorts the uncompleted tests in order from soonest to finish (top of table) to last to finish (bottom of table)
  // keeps the completed tests at the bottom of the table
  for (let i = 0; i < x_len - 1 - n; i++) {
    for (let j = 1; j < x_len - (i + 1 + n); j++) {
      if (
        Number(timesDict[x[j].cells[7].innerText]) >
        Number(timesDict[x[j + 1].cells[7].innerText])
      ) {
        x[i].parentNode.insertBefore(x[j + 1], x[j]);
      }
    }
  }
}
sortDOM();
