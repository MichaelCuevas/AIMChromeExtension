"use strict";

function getRandomColor() {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function modifyDOM() {
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
  //let json_str;
  // loops through each row and checks if the test is finished, close to being finishes, or a no show.
  for (let i = 1; i < x_len; i++) {
    // calculates the amount of time until the test ends for each test
    let times = x[i].cells[10].innerText;
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
    let totalDiffMin = differenceHour * 60 + differenceMinute;

    // Changes the background of the time cell for each test.
    // Green = Complete, green-yellow = No Show, yellow = finish within 10 minutes
    // orange = Finish within 5 minutes, and Red = Past Due
    if (
      x[i].cells[1].innerText.includes("Completed") ||
      x[i].cells[1].innerText.includes("No Show")
    ) {
      x[i].cells[10].bgColor = "gray";
    } else if (
      x[i].cells[1].innerText.includes("Approved") ||
      x[i].cells[1].innerText.includes("Processing")
    ) {
      //x[i].cells[10].bgColor = "LightSteelBlue";
    } else if (totalDiffMin <= 0) {
      x[i].cells[10].bgColor = "red";
    } else if (totalDiffMin <= 5) {
      x[i].cells[10].bgColor = "orange";
    } else if (totalDiffMin <= 10) {
      x[i].cells[10].bgColor = "yellow";
    } else if (x[i].cells[1].textContent.includes("In ")) {
      x[i].cells[10].bgColor = "green";
    }
  }
}
// run the function defined above whenever this script is run
modifyDOM();

// run the function every 30 seconds after the initial execution
setInterval(function() {
  modifyDOM();
}, 30 * 1000);
