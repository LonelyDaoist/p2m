const MongoClient = require('mongodb').MongoClient;
const { getLinks } = require('./src/getLinks');
const { getData_seloger, getData_bellesdemeures } = require('./src/getData');
const { delay, switchUserAgent } = require('./src/helper');

const DB_STRING = process.env.DB_STRING; // database connection string

const START_PAGE = parseInt(process.env.START_PAGE); // the first page to scrape
const END_PAGE	= parseInt(process.env.END_PAGE); // the last page to scrape

const delayPages = delay(50,20); // wait for a random number of seconds between 20 and 60 after each iteration to avoid block
const delayOffers = delay(7,2); // wait for a random number of seconds between 2 and 8 after each iteration to avoid block

(async () => {
	//======== Connecting to the Database ========
	const db = await MongoClient.connect(DB_STRING);
	console.log('Connected to Database');
	const p2m = db.db('p2m');
	console.log('Switched to p2m');
	//============================================
	for (let i = START_PAGE;i <= END_PAGE; i++) {
		console.log(`Current Page: ${i}`); // To keep track
		let cnt = 0; // to keep count
		const userAgent = switchUserAgent() // get a user agent for each iteration
		//======== Get all links on the current page ========
		const links = await getLinks(userAgent,`https://seloger.com/list.htm?projects=1%2C14&types=1%2C2%2C4%2C3%2C9%2C13%2C14%2C12%2C11%2C10%2C18&places=%5B%7Bdiv%3A2238%7D%5D&enterprise=0&qsVersion=1.0&LISTING-LISTpg=${i}`);
		//===================================================
		if (!links.length) {
			console.log('Blocked');
			break;
		}
		//======== for each link scrap the data and save it to the DB ========
		for (let link of links) {
			let data;
			if (link.includes('seloger'))
				data = await getData_seloger(userAgent,link); // scrap the data on current real estate
			else if (link.includes('bellesdemeures'))
				data = await getData_bellesdemeures(userAgent,link); // same thing
			//======== Saving data to DB ========
			if (data) {
				await p2m.collection('rental').insertOne(data);
				console.log('Document inserted');
				cnt++;
			}
			await delayOffers();
			//===================================
		}
		console.log(`Count: ${cnt}`);
		await delayPages();
		//====================================================================
	}
	db.close(); // Closing the connection
	console.log('Closed the Database');
})()
	.catch(error => console.log(error));