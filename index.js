const { getLinks } = require('./src/getLinks');
const { getData } = require('./src/getData');

/* const links = [
	'https://seloger.com/list.html?projects=1,14&types=1,2,4,3,9,13,14,12,11,10,18&places=[{div:2238}]&enterprise=0&qsVersion=1.0',
	'https://seloger.com/list.htm?projects=1%2C14&types=1%2C2%2C4%2C3%2C9%2C13%2C14%2C12%2C11%2C10%2C18&places=%5B%7Bdiv%3A2238%7D%5D&enterprise=0&qsVersion=1.0&LISTING-LISTpg=2',
	'https://seloger.com/list.htm?projects=1%2C14&types=1%2C2%2C4%2C3%2C9%2C13%2C14%2C12%2C11%2C10%2C18&places=[{div%3A2238}]&enterprise=0&qsVersion=1.0&LISTING-LISTpg=3'
];

for (let link of links) {
	getLinks(link);
} */

const urls = [
	'https://www.seloger.com/annonces/locations/appartement/paris-20eme-75/belleville/156992911.htm?projects=1,14&types=1,2,4,3,9,13,14,12,11,10,18&places=[{div:2238}]&enterprise=0&qsVersion=1.0&bd=ListToDetail',
	'https://www.seloger.com/annonces/locations/appartement/paris-17eme-75/courcelles-wagram/156683735.htm?projects=1,14&types=1,2,4,3,9,13,14,12,11,10,18&places=[{div:2238}]&enterprise=0&qsVersion=1.0&bd=ListToDetail'
];
for (let url of urls) {
	getData(url);
}

console.log('done');