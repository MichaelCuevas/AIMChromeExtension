function getURLS() {
  // Grabs the rows from the table and counts the number of rows
  x = document.getElementById(
    "ctl00_ctl00_MainContent_CphMainContent_ListRequests_Grid"
  ).rows;

  // If the test table doesn't exist, there are no tests that day
  if (x === null) {
    return;
  }
  let x_len = x.length;
  let urls = [x_len];
  //let json_str;
  // loops through each row and checks if the test is finished, close to being finishes, or a no show.
  for (let i = 1; i < x_len; i++) {
    // calculates the amount of time until the test ends for each test
    urls[i - 1] = x[i].cells[6].getElementsByTagName("a")[0].href;
  }
  return urls;
}

function fetchContent() {
  var urls = getURLS();
  httpRequest = [getURLS.length];
  for (let i = 0; i < urls.length; i++) {
    httpRequest[i] = new XMLHttpRequest();
    if (!httpRequest[i]) {
      alert("Giving up :( Cannot create an XMLHTTP instance");
    }
    httpRequest[i].onload = function() {
      if (httpRequest[i].readyState === XMLHttpRequest.DONE) {
        if (httpRequest[i].status === 200) {
          let resp = httpRequest[i].responseText;
          let kellogStudent = false;
          if (resp.indexOf("Kellogg School Management") > -1) {
            kellogStudent = true;
          }
          if (kellogStudent) {
            y = document.getElementById(
              "ctl00_ctl00_MainContent_CphMainContent_ListRequests_Grid"
            ).rows;
            y[i + 1].cells[6].bgColor = "Yellow";
          }
          console.log(kellogStudent);
        } else {
          alert("There was a problem with the request.");
        }
      }
    };
    httpRequest[i].open("GET", urls[i]);
    //httpRequest[i].response = "document";
    httpRequest[i].send();
  }
}

fetchContent();
