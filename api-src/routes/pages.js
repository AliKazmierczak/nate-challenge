const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");

router.get("/word-count", async (req, res, next) => {
  let requestedUrl = req.query.url;
  let sort = req.query.sort;

  if (sort && Object.keys(sort).length > 1) {
    next(new Error("Too many sorting options."));
  }

  let statistics = await webWordCounter(requestedUrl);

  res.send(statistics);

  // let sorted = await sortingMachine(statistics, sort);
  // res.send(sorted)
});

async function sortingMachine(stat, sort) {
  switch (Object.values(sort)) {
    case "asc":
      if ((Object.keys(sort).pop = "byWords")) {
        stat.sort();
      }
  }
}

async function webWordCounter(requestedUrl, next) {
  let wordCount = axios
    .get(requestedUrl)
    .then(response => {
      if (response.status !== 200) {
        throw new Error("The website is unavaliable, sorry.");
      }
      const html = response.data;
      const $ = cheerio.load(html);

      let receivedTextAsArray = $.text().split(" ");
      var uniqueWords = {};

      for (word of receivedTextAsArray) {
        word = word.toLowerCase();
        word = word.replace(/[^a-z]/g, "");
        if (word.length == 0) {
          continue;
        }
        if (uniqueWords.hasOwnProperty(word) === false) {
          uniqueWords[word] = 1;
        } else {
          uniqueWords[word]++;
        }
      }
      let arrayOfUniqueWords = Object.keys(uniqueWords).map(wordElement => {
        return {
          word: wordElement,
          count: uniqueWords[wordElement]
        };
      });
      return arrayOfUniqueWords;
    })
    .catch(err => {
      next(new Error(err));
    });

  return wordCount;
}

module.exports = router;
