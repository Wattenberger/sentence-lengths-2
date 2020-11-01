import { range } from "d3-array";
import { scaleLinear } from "d3-scale";

export const maxLength = 60;
export const colorScale = scaleLinear()
  .domain([0, maxLength / 2, maxLength])
  .range(["#9CABF0", "#fff", "#F9E0AC"]);
// .range(["#FEE398", "#fff", "#B4DCEB"]);

export const splitIntoParagraphs = (str) =>
  str.split(/(.+)((\r?\n.+)*)/gm).filter((d) => d && d.length > 2);
export const splitIntoSentences = (str) => {
  const naiveSentences = (
    str.match(/([^\.!\?]+[\.!\?”"]+)|([^\.!\?]+$)/g) || []
  )
    .filter((d) => d)
    .map((d) => d.trim());

  let holding = [];
  let parsedSentences = [];
  naiveSentences.forEach((sentence, i) => {
    if (
      ["Ms", "Mrs", "Mr", "Dr"].includes(
        sentence.split(/ /g).slice(-1)[0].slice(0, -1)
      )
    ) {
      holding.push(sentence);
    } else {
      parsedSentences.push([holding, sentence].join(" "));

      holding = [];
    }
  });
  if (holding.length) {
    parsedSentences = [...parsedSentences, ...holding];
  }
  return parsedSentences.filter((d) => d);
};

export const mean = (arr = []) => arr.reduce((a, b) => a + b, 0) / arr.length;
export const flatten = (arr = []) => (arr.length ? arr.flat() : []);
export const parseSample = (sample = "") => {
  const paragraphs = splitIntoParagraphs(sample).map(splitIntoSentences);
  const sentences = flatten(paragraphs).filter((d) => d);
  const sentenceLengths = sentences.map(
    (sentence) => sentence.split(" ").length
  );
  const averageLength = mean(sentenceLengths);

  return {
    paragraphs,
    sentenceLengths,
    averageLength,
  };
};

let id = 0;
export const getId = () => {
  id++;
  return id;
};
