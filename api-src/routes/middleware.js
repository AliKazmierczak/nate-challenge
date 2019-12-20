const validator = require("validator");

function wordsCountMiddleware(req, res, next) {
  try {
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
  return true;
}

function sanitizeUrl(url) {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return "http://" + url;
  }
  return url;
}

module.exports.wordsCountMiddleware = wordsCountMiddleware;
module.exports.validateUrl = validateUrl;
module.exports.sanitizeUrl = sanitizeUrl;
