const fetch = require('node-fetch');
const fs = require('fs');
const cheerio = require('cheerio');

const siteUrl = 'https://memegen-link-examples-upleveled.netlify.app/';

fs.mkdirSync('./Meme', { recursive: true });
console.log("Finding or creating 'Meme' folder...");

const getMemes = async () => {
  const response = await fetch(siteUrl);
  const body = await response.text();

  const $ = cheerio.load(body);
  const linkList = [];

  $('img').each((i, link) => {
    if (i < 10) {
      linkList.push(link.attribs.src);
    }
  });

  for (let j = 0; j < 10; j++) {
    const url = linkList[j];

    async function download() {
      const response2 = await fetch(url);
      const buffer = await response2.buffer();
      fs.writeFile(`./Meme/image${j}.jpg`, buffer, () =>
        console.log('finished downloading!'),
      );
    }
    download(linkList[j]);
  }
};

getMemes();
