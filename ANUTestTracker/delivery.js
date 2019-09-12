"use strict";
function aggData() {
    let x = document.getElementsByClassName("content")[0].childNodes;
    let numClasses = x.length - 2;
    let classList;
    let deliveryMethod;
    let listString =
        '<th width="25%">Class</th><th width="25%">Total Exams Needed</th><th width="50%">Delivery Method</th>';
    let dMethodTemp;
    let listLen;
    let numNeed;
    for (let i = 0; i < numClasses; i++) {
        classList = x[i]
            .getElementsByClassName("test-info-left")[0]
            .innerText.split("\n")[0];
        numNeed = x[i].getElementsByClassName("test-info-left")[1].innerText;
        dMethodTemp = x[i].childNodes[5]
            .getElementsByClassName("exam")[0]
            .getElementsByTagName("li");
        listLen = dMethodTemp.length;
        dMethodTemp = dMethodTemp[listLen - 2].innerText;
        if (dMethodTemp.includes("Delivered")) {
            deliveryMethod = dMethodTemp.split("Note:")[2];
        } else if (dMethodTemp.includes("Note:")) {
            deliveryMethod = dMethodTemp.split("Note:")[1];
        } else {
            deliveryMethod = " Pick-up";
        }
        listString +=
            "<tr><td>" +
            classList +
            "</td><td>" +
            numNeed +
            "</td><td>" +
            deliveryMethod +
            "</td></tr>";
    }
    x[0]
        .getElementsByTagName("table")[0]
        .insertAdjacentHTML("afterbegin", listString);

}

aggData();