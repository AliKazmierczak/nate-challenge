const {
  validateUrl,
  sanitizeUrl
} = require("../../routes/middleware");

describe("tests validateUrl function", () => {
  test("expect an error when an invalid url is given", () => {
    const functionToTestCallback = () => {
      let url = "foo";
      validateUrl(url);
    };
    expect(functionToTestCallback).toThrow();
  });
  test("expect the function to return true if a valid form of url is given", () => {
 
      let url = "www.foo.com";
      let responce = validateUrl(url);
  
    expect(responce).toEqual(true);
  })
});

describe("tests sanitizeUrl function", () => {
  test("adds 'http://' in front of a url that lacks it", () => {
    let url = "foo.com";
    let filledUrl = sanitizeUrl(url);
    let expectedUrl = "http://foo.com"

    expect(filledUrl).toEqual(expectedUrl)
  })
  test("doesn't change a given url if it has 'http://' in front", () => {
    let url = 'http://foo.com'
    let filledUrl = sanitizeUrl(url);

    expect(filledUrl).toEqual(url)
  })
  test("doesn't change a given url if it has 'https://' in front", () => {
    let url = 'https://foo.com'
    let filledUrl = sanitizeUrl(url);

    expect(filledUrl).toEqual(url)
  })
  test("adds 'http://' in front of a url even if the phrase is inside given string", () => {
    let url = "foohttp://bar.com";
    let filledUrl = sanitizeUrl(url);
    let expectedUrl = "http://foohttp://bar.com"

    expect(filledUrl).toEqual(expectedUrl)
  })
});