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

  axios
    .get(requestedUrl)
    .then(response => {
      if (response.status !== 200) {
        throw new Error("The website is unavaliable, sorry.");
      }
      const html = response.data;
      const $ = cheerio.load(html);
      // Get text
      let receivedTextAsArray = $.text().split(" ");
      let uniqueWords = {};

      for (word of receivedTextAsArray) {
          word = word.toLowerCase();
          word = word.replace(/[^a-z ]/g, "");
        if (uniqueWords.hasOwnProperty(word) === false) {
          uniqueWords[word] = 1;
          uniqueWords;
        } else {
          uniqueWords[word]++;
          uniqueWords;
        }
      }

      res.send(uniqueWords);
    })
    .catch(err => {
      next(new Error(err));
    });
});

module.exports = router;
