// TYLKO operacje na request, takie jak:
// - validate
// - sanitize

// LUB logika powtarzalna, eg. autoryzacja

const validator = require("validator");

function wordsCountMiddleware(req, res, next) {
  try {
    validateSort(req.query.sort);
    validateUrl(req.query.url);
    req.query.url = sanitizeUrl(req.query.url);
  } catch (error) {
    res.status(400).send({ error_message: error.message });
  }

  next();
}

function validateUrl(url) {
  if (!validator.isURL(url)) {
    throw new Error("This is not a valid URL adress.");
  }
}

function sanitizeUrl(url) {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return "http://" + url;
  }
  return url;
}
function validateSort(sort) {
  if (sort && Object.keys(sort).length > 1) {
    throw new Error("Please pick only one sorting option.");
  }
}

module.exports.wordsCountMiddleware = wordsCountMiddleware;
