const puppeteerExtra = require('puppeteer-extra');
const pluginStealth = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');

module.exports = {
	getData: async (url) => {
		try {
			puppeteerExtra.use(pluginStealth());
			const browser = await puppeteerExtra.launch({
				executablePath: '/usr/bin/chromium-browser',
				args: ['--no-sandbox', '--headless', '--disable-gpu']
			});
			const page = await browser.newPage();
			await page.goto(url);
			await page.waitForSelector('body');
			
			const info = await page.evaluate(() => {
				const summary = document.querySelectorAll('div.Summary__Text-sc-1wkzvu-6');
				const description = document.querySelector('div.ShowMoreText__UITextContainer-sc-5ggbbc-0 p');
				return {
					type: summary[0].innerText,
					location: summary[1].innerText,
					price: summary[2].innerText,
					description: description.innerText
				};
			});
			
			await browser.close();
			fs.appendFile('./data/houses.json',JSON.stringify(info),(err) => console.log(err));
		}
		catch(error) {
			console.log(error);
		}
	}
};