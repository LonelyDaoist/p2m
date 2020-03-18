<<<<<<< HEAD
module.exports = {
	delay: (time) => {
		return new Promise(resolve => setTimeout(resolve,time));
	}
};
=======

userAgents = [
	'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36',
	'Mozilla/5.0 (X11; Ubuntu; Linux i686; rv:24.0) Gecko/20100101 Firefox/24.0',
	'BrightSign/8.0.69 (XT1143)Mozilla/5.0 (X11; Linux armv7l) AppleWebKit/537.36 (KHTML, like Gecko) QtWebEngine/5.11.2 Chrome/65.0.3325.230 Safari/537.36',
	'Mozilla/5.0 (X11; U; Linux i686; pt-BR; rv:1.9.0.15) Gecko/2009102815 Ubuntu/9.04 (jaunty) Firefox/3.0.15',
	'Mozilla/5.0 (Linux; Android 6.0.1; RedMi Note 5 Build/RB3N5C; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36',
	'Mozilla/5.0 (Linux; Android 9; SM-G960F Build/PPR1.180610.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/74.0.3729.157 Mobile Safari/537.36',
	'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.1 Safari/605.1.15'
];

module.exports = {
	delay: (limit,offset) => () => {
		const time = 1000 * (Math.floor(Math.random()*limit) + offset);
		return new Promise(resolve => setTimeout(resolve,time));
	},
	switchUserAgent: () => {
		const index = Math.floor(Math.random()*userAgents.length);
		return userAgents[index];
	}
};
>>>>>>> atlas
