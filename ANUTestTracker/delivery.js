"use strict";
function aggData() {
  let x = document.getElementsByClassName("byClass");
  let numClasses = x.length;
  x = document.getElementsByClassName("content")[0].childNodes;
  let classInfo; // HTML content with class name and number of exams
  let className; // class name in string form
  let numNeed; // number of exams per class in string form
  let proctorInfo; // HTML content with proctor info
  let testAids; // HTML content with test aid info
  let testAidsText = ""; // string of aids that students are allowed to use on text
  let deliveryMethod; // string with delivery instructions
  let listString =
    '<table style="width: 100%; border: 0; margin-bottom: 1em; margin-top: 1em;"> \
        <tbody><tr> \
        <th width="10%">Class</th> \
        <th width="50%">Delivery Method</th> \
        <th width="5%">Total Exams Needed</th> \
        <th width="35%">Allowed Aids</th></tr>';
  let dMethodTemp; // temp variable for holding info about the delivery method

  for (let i = 0; i < numClasses; i++) {
    classInfo = x[i].getElementsByClassName("test-info-left");
    className = classInfo[0].innerText.split("\n")[0];
    numNeed = classInfo[1].innerText;
    proctorInfo = x[i]
      .getElementsByClassName("exam")[0]
      .getElementsByTagName("li");
    testAids = proctorInfo[2].childNodes;
    testAidsText = "";
    for (let j = 1; j < testAids.length; j++) {
      testAidsText += testAids[j].innerText + "<br>";
    }
    dMethodTemp = proctorInfo[proctorInfo.length - 2].innerText;
    if (dMethodTemp.includes("Delivered")) {
      deliveryMethod = dMethodTemp.split("Note:")[2];
    } else if (dMethodTemp.includes("Note:")) {
      deliveryMethod = dMethodTemp.split("Note:")[1];
    } else {
      deliveryMethod = " Pick-up";
    }
    if (i % 2) {
      listString +=
        "<tr><td>" +
        className +
        "</td><td>" +
        deliveryMethod +
        "</td><td>" +
        numNeed +
        "</td><td>" +
        testAidsText +
        "</td></tr>";
    } else {
      listString +=
        "<tr bgcolor='f2f2f2';><td>" +
        className +
        "</td><td>" +
        deliveryMethod +
        "</td><td>" +
        numNeed +
        "</td><td>" +
        testAidsText +
        "</td></tr>";
    }
  }
  document.getElementsByTagName("body")[0].innerHTML =
    listString + "</tbody></table>";
}

aggData();
