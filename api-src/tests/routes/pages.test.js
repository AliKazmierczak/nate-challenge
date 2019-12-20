const {
  webWordExtracter,
  stringWordExtractor,
  wordCounter
} = require("../../routes/pages");
let axios = require("axios");

jest.mock("axios");

describe("Tests functionality of webWordExtracter function", () => {
  test("function returns a string of words from given website", () => {
    axios.get.mockResolvedValue({
      status: 200,
      data: "foo <div>bar</div>"
    });
    webWordExtracter("www.foo.com").then(wordsFromUrl => {
      expect(wordsFromUrl).toEqual("foo bar");
    });
  });
  test("function throws error if status responce from website is other than 200", async () => {
    axios.get.mockResolvedValue({
      status: 999,
      data: "foo <div>bar</div>"
    });
    expect(webWordExtracter()).rejects.toEqual(
      new Error("The website is unavaliable, sorry."))

  });
});

describe("Tests functionality of wordCounter function", () => {
  let array = ["foo", "bar", "Bar", ""];

  test("function returns an array of objects", () => {
    let expected = [{ word: "FOO", count: 1 }];
    let arrayToTest = wordCounter(array);

    expect(arrayToTest).toEqual(expect.arrayContaining(expected));
  });
  test("function counts the word regardless of if it's written in upper or lower case", () => {
    let arrayToTest = wordCounter(array);
    let expected = [{ word: "BAR", count: 2 }];

    expect(arrayToTest).toEqual(expect.arrayContaining(expected));
  });
  test("function will ignore empty elements of input array", () => {
    let arrayToTest = wordCounter(array);
    let expected = [{ word: "", count: 1 }];

    expect(arrayToTest).not.toEqual(expect.arrayContaining(expected));
  });
  test("function will return an empty array if there are no valid elements in input array", () => {
    let array = ["", ""];
    let arrayToTest = wordCounter(array);
    let expected = [];

    expect(arrayToTest).toEqual(expect.arrayContaining(expected));
  });
});

describe("Tests functionality of stringWordExtractor function", () => {
  test("function creates an array from a given string", () => {
    let string = "Ala ma kota.";
    let expectedArray = ["Ala", "ma", "kota", ""];

    expect(stringWordExtractor(string)).toEqual(expectedArray);
  });
  test("function deletes all elements from given string that are not letters", () => {
    let string = "Foo, Bar?! 15:20";
    let expectedArray = ["Foo", "", "Bar", "", "", "", "", "", "", "", ""];

    expect(stringWordExtractor(string)).toEqual(expectedArray);
  });
});
