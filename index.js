const { getLinks } = require('./src/getLinks');
const { getData_seloger, getData_bellesdemeures } = require('./src/getData');

const START_PAGE = 1;
const END_PAGE = 3;

for (let i=START_PAGE;i<=END_PAGE;i++) {
	getLinks(`https://seloger.com/list.htm?projects=1%2C14&types=1%2C2%2C4%2C3%2C9%2C13%2C14%2C12%2C11%2C10%2C18&places=%5B%7Bdiv%3A2238%7D%5D&enterprise=0&qsVersion=1.0&LISTING-LISTpg=${i}`)
	.then(urls => {
		console.log(urls);
		for (let url of urls) {
			if (url.includes('seloger')){
				getData_seloger(url);
			}
			if (url.includes('bellesdemeures')){
				getData_bellesdemeures(url);
			}
		}
	});
}

console.log('done');