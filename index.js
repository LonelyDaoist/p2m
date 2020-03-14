const { getLinks } = require('./src/getLinks');
const { getData_seloger, getData_bellesdemeures } = require('./src/getData');


(async () => {
	const i = 1;
	console.log(`Current Page: ${i}`);
	const links = await getLinks(`https://seloger.com/list.htm?projects=1%2C14&types=1%2C2%2C4%2C3%2C9%2C13%2C14%2C12%2C11%2C10%2C18&places=%5B%7Bdiv%3A2238%7D%5D&enterprise=0&qsVersion=1.0&LISTING-LISTpg=${i}`);	
	for (let link of links) {
		if (link.includes('seloger'))
			await getData_seloger(link);
		if (link.includes('bellesdemeures'))
			await getData_bellesdemeures(link);
	}
})();