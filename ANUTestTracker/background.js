// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

"use strict";
// Whenever the "Tasks Du Jour" page is loaded, calculate the remaining test times and mark them accordingly

function doInANUTab(tabCallback) {
  chrome.tabs.query(
    {
      currentWindow: true,
      active: true,
      url: ["*://*.accessiblelearning.com/*/SVC-ATS-TaskDuJour*"]
    },
    function(tabArray) {
      tabCallback(tabArray[0]);
    }
  );
}

chrome.webNavigation.onCompleted.addListener(
  function() {
    let ANUTabId;
    doInANUTab(function(tab) {
      ANUTabId = tab.id;
    });
    chrome.tabs.executeScript(ANUTabId, {
      file: "content.js"
    });
  },
  {
    url: [
      {
        urlMatches:
          ".*teton.accessiblelearning.com/.*/.*SVC-ATS-TaskDuJour.aspx.*"
      }
    ]
  }
);

// listens for the sort command and sorts the test table if heard
chrome.commands.onCommand.addListener(function(command) {
  if (command === "sort") {
    let ANUTabId;
    doInANUTab(function(tab) {
      ANUTabId = tab.id;
    });
    console.log("sorted");
    chrome.tabs.executeScript(ANUTabId, {
      file: "sort.js"
    });
  }
  if (command === "delivery") {
    let ANUTabId;
    doInANUTab(function(tab) {
      ANUTabId = tab.id;
    });
    chrome.tabs.executeScript(ANUTabId, {
      file: "delivery.js"
    });
  }
  if (command === "kellogg") {
    chrome.tabs.executeScript(null, {
      file: "request.js"
    });
  }
});
