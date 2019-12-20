const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
const { wordsCountMiddleware } = require("./middleware");

router.get("/word-count", wordsCountMiddleware, async (req, res) => {
  let requestedUrl = req.query.url;
  console.log(typeof req.query.url, req.query.url);

  try {
    let stringFromUrl = await webWordExtractor(requestedUrl);
    let arrayOfWords = stringWordExtractor(stringFromUrl);
    let statistics = wordCounter(arrayOfWords);

    res.send(statistics);
  } catch (error) {
    res.status(400).send({ error_message: error.message });
  }
});

async function webWordExtractor(requestedUrl) {
  let pageWords = axios
    .get(requestedUrl)
    .then(response => {
      if (response.status !== 200) {
        throw new Error("The website is unavaliable, sorry.");
      }
      const html = response.data;
      const stringOfWords = cheerio.load(html);
      return stringOfWords.text();
    })
    .catch(error => {
      throw error;
    });

  return pageWords;
}

function stringWordExtractor(stringFromUrl) {
  let receivedTextAsArray = stringFromUrl.split(/[^a-zA-Z]/);

  return receivedTextAsArray;
}

function wordCounter(receivedTextAsArray) {
  let uniqueWords = {};

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
module.exports.webWordExtracter = webWordExtractor;
module.exports.wordCounter = wordCounter;
module.exports.stringWordExtractor = stringWordExtractor;
