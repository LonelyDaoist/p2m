const MongoClient = require('mongodb').MongoClient;
const { getLinks } = require('./src/getLinks');
const { getData_seloger, getData_bellesdemeures } = require('./src/getData');
const { delay } = require('./src/helper');

const STRING = 'mongodb+srv://ghassen_ghabarou:nRxmf4ZBLMeUGdJc@p2m-gv69j.mongodb.net/test?retryWrites=true&w=majority'; // database connection string

const START_PAGE = 1; // the first page to scrape
const END_PAGE	= 10; // the last page to scrape

(async () => {
	//======== Connecting to the Database ========
	const db = await MongoClient.connect(STRING);
	console.log('Connected to Database');
	const p2m = db.db('p2m');
	console.log('Switched to p2m');
	//============================================
	for (let i = START_PAGE;i <= END_PAGE; i++) {
		console.log(`Current Page: ${i}`); // To keep track
		//======== Get all links on the current page ========
		const links = await getLinks(`https://seloger.com/list.htm?projects=1%2C14&types=1%2C2%2C4%2C3%2C9%2C13%2C14%2C12%2C11%2C10%2C18&places=%5B%7Bdiv%3A2238%7D%5D&enterprise=0&qsVersion=1.0&LISTING-LISTpg=${i}`);
		//===================================================
		if (!links.length) {
			console.log('Blocked');
			break;
		}
		//======== for each link scrap the data and save it to the DB ========
		for (let link of links) {
			let data;
			if (link.includes('seloger'))
				data = await getData_seloger(link); // scrap the data on current real estate
			else if (link.includes('bellesdemeures'))
				data = await getData_bellesdemeures(link); // same thing
			//======== Saving data to DB ========
			if (data) {
				await p2m.collection('rental').insertOne(data);
				console.log('Document inserted');
			}
			await delay(3000); // wait for 3 seconds after each iteration to avoid block
			//===================================
		}
		//====================================================================
	}
	db.close(); // Closing the connection
	console.log('Closed the Database');
})()
	.catch(error => console.log(error));