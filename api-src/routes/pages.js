const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
const { wordsCountMiddleware } = require("./middleware");

router.get("/word-count", wordsCountMiddleware, async (req, res, next) => {
  let requestedUrl = req.query.url;
  console.log(typeof req.query.url, req.query.url);


  try {
    let wordsArray = await webWordExtracter(requestedUrl);

    let statistics = await wordCounter(wordsArray);
  
    res.send(statistics);
  }
  catch(error) {
    res.status(400).send({ error_message: error.message });
  }

  // let sorted = await sortingMachine(statistics, sort);
  // res.send(sorted)
});

async function arraySorter(array, sort) {
  switch (Object.values(sort)) {
    case "asc":
      if ((Object.keys(sort).pop = "byWords")) {
        array.sort();
      }
  }
}
async function webWordExtracter(requestedUrl) {
  let pageWords = axios
    .get(requestedUrl)
    .then(response => {
      if (response.status !== 200) {
        throw new Error("The website is unavaliable, sorry.");
      }
      const html = response.data;
      const $ = cheerio.load(html);

      let receivedTextAsArray = $.text().split(/[^a-zA-Z]/);

      return receivedTextAsArray;
    })
    .catch(err => {
      throw new Error(err);
    });

  return pageWords;
}

async function wordCounter(receivedTextAsArray) {
  var uniqueWords = {};

  for (word of receivedTextAsArray) {
    word = word.toUpperCase();
    if (word.length == 0) {
      continue;
    }
    if (!uniqueWords.hasOwnProperty(word)) {
      uniqueWords[word] = {
        word: word,
        count: 1
      };
      continue;
    } else {
      uniqueWords[word].count++;
    }
  }
  return Object.values(uniqueWords);
}

module.exports = router;
