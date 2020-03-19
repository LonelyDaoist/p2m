const puppeteerExtra = require('puppeteer-extra');
const pluginStealth = require('puppeteer-extra-plugin-stealth');

module.exports = {
	getData_seloger: async (userAgent,url) => {
		try {
			puppeteerExtra.use(pluginStealth());
			const browser = await puppeteerExtra.launch({
				executablePath: '/usr/bin/chromium-browser',
				args: ['--no-sandbox',
				'--headless',
				'--disable-gpu',
				]
			});
			const page = await browser.newPage();
			await page.setUserAgent(userAgent);
			await page.goto(url,{waitUntil: 'load', timeout: 0});
			await page.waitForSelector('body');
			
			const info = await page.evaluate(() => {
				const type = document.querySelector('div.Summarystyled__Title-tzuaot-3');
				const location = document.querySelector('div.Summarystyled__Address-tzuaot-5');
				const price = document.querySelector('span.global-styles__TextNoWrap-sc-1aeotog-6');
				const description = document.querySelector('div.ShowMoreText__UITextContainer-sc-5ggbbc-0 p');
				const general = document.querySelectorAll('li.GeneralList__Item-sc-9gtpjm-1');
				const plus = document.querySelectorAll('figcaption');
				let general_infos = {};
				let plus_infos = {};
				for (let i=0;i<general.length;i++) {
					general_infos[`info_${i+1}`] = general[i].innerText;
				}
				for (let i=0;i<plus.length;i++) {
					plus_infos[`plus_${i+1}`] = plus[i].innerText;
				}
				
				if (!type && !location && !price && !description) {
					return null;
				}

				return {
					type: (type ? type.innerText : null),
					location: (location ? location.innerText : null),
					price: (price ? price.innerText : null),
					description: (description ? description.innerText : null),
					...general_infos,
					...plus_infos,
				};
			});
			
			await browser.close();
			return info;
		}
		catch(error) {
			throw error;
		}
	},
	getData_bellesdemeures: async (userAgent,url) => {
		try {
			puppeteerExtra.use(pluginStealth());
			const browser = await puppeteerExtra.launch({
				executablePath: '/usr/bin/chromium-browser',
				args: ['--no-sandbox',
				'--headless',
				'--disable-gpu',
				]
			});
			const page = await browser.newPage();
			await page.setUserAgent(userAgent);
			await page.goto(url,{waitUntil: 'load', timeout: 0});
			await page.waitForSelector('body');
			
			const info = await page.evaluate(() => {
				const type = document.querySelector('span.detailBannerInfosTypeBien');
				const description = document.querySelector('p.detailDescSummary');
				const general = document.querySelectorAll('.detailInfosList3Cols ul li');
				const location = document.querySelector('span.js_locality');
				const price = document.querySelector('span.js_price');
				let general_infos = {};
				for (let i=0;i<general.length;i++) {
					general_infos[`info_${i+1}`] = general[i].innerText;
				}

				if (!type && !location && !price && !description) {
					return null;
				}

				return {
					type: (type ? type.innerText:null),
					location: (location ? location.innerText:null),
					price: (price ? price.innerText:null),
					description: (description ? description.innerText:null),
					...general_infos,
				};
			});
			
			await browser.close();
			return info;
		}
		catch(error) {
			throw error;
		}
	}
};