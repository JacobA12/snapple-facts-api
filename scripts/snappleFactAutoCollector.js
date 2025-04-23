// ==UserScript==
// @name         Snapple Auto Fact Collector
// @namespace    http://tampermonkey.net/
// @version      2025-04-23
// @description  Automatically collect Snapple facts via the random button and log them in console
// @author       You
// @match        https://www.snapple.com/real-facts/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=snapple.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const collected = new Set();
  const limit = 100; // Change this to collect more or fewer

  function getFactData() {
    const factEl = document.querySelector("div.fact.pt-3");
    const numberEl = document.querySelector("div.number.pt-4");

    if (factEl && numberEl) {
      return {
        id: numberEl.textContent.trim().replace("#", ""),
        text: factEl.textContent.trim(),
      };
    }

    return null;
  }

  function clickRandomizer() {
    const button = document.querySelector("div.cta.randomize");
    if (button) {
      button.click();
    } else {
      console.warn("Randomizer button not found.");
    }
  }

  function loopFacts() {
    const data = getFactData();
    if (data && !collected.has(data.text)) {
      collected.add(data.text);
      console.log(`Collected (${collected.size}): #${data.id} - ${data.text}`);

      // Send it to your API in real time
      fetch("http://localhost:3000/api/facts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then(async (res) => {
          const text = await res.text();
          if (!res.ok) {
            console.error(`API Error (${res.status}):`, text);
            return;
          }
          console.log("Sent to API:", text);
        })
        .catch((err) => {
          console.error("API Network Error:", err.message);
        });
    }

    if (collected.size >= limit) {
      console.log("DONE! Collected all facts!");
      alert("Finished collecting and sending Snapple facts!");
      return;
    }

    setTimeout(() => {
      clickRandomizer();
    }, 1500);
  }

  const observer = new MutationObserver(() => {
    loopFacts();
  });

  observer.observe(document.body, { childList: true, subtree: true });

  setTimeout(() => {
    loopFacts();
  }, 1000);
})();
