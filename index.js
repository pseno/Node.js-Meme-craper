const fetch = require('node-fetch');
const cheerio = require('cheerio');

fetch('https://memegen-link-examples-upleveled.netlify.app/')
  .then((res) => res.text())
  .then((body) => {
    console.log(body);
  });
