//const puppeteer = require('puppeteer');
const puppeteerExtra = require('puppeteer-extra');
const pluginStealth = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');

module.exports = {
	getLinks: async (url) => {
		try {
			puppeteerExtra.use(pluginStealth());
			//const browser = await puppeteer.launch({
			const browser = await puppeteerExtra.launch({
			executablePath: '/usr/bin/chromium-browser',
			args: ['--no-sandbox', '--headless', '--disable-gpu']
			});
			const page = await browser.newPage();
			await page.goto(url);
			await page.waitForSelector("body");
			var urls = await page.evaluate(() => {
				var links = document.querySelectorAll('a[class^=CoveringLink-a3s3kt-0');
				var LinkArray = [];
				for (var i = 0; i < links.length; i++) {
					LinkArray[i] = links[i].getAttribute("href");
				}
				return LinkArray;
			});
			await browser.close();
			
			return urls;
			}
		catch (error){
			console.log(error);
		}
	}
};