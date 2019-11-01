const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const base = 'https://resources.allsetlearning.com'
let dataModel = []

axios.get(base + '/chinese/grammar/HSK_1_grammar_points')
.then(async response => {
    // handle success
    const $ = cheerio.load(response.data);
	const links = $('.mw-redirect')
	for (let i = 0; i < links.length; ++i) {
    	const href = links[i].attribs.href;
		const pageData = await parsePage(href)
		dataModel = [...dataModel, ...pageData]
	}
	console.log(dataModel.length)
	fs.writeFileSync('HSK1.json', JSON.stringify(dataModel))
}).catch(function (resp) { console.log("error" + resp) });

const parsePage = async href => {
    let res = await axios.get(base + href)
	const $ = cheerio.load(res.data);
	const sents = $('.liju li')
	const pinyin = sents.children('.pinyin').remove()
	const trans = sents.children('.trans').remove()
	var parse = []
	    for (let i = 0; i < sents.length; ++i) {
	    	parse[i] = {
				zh: $(sents[i]).text(),
				py: $(pinyin[i]).text(),
				engl: $(trans[i]).text()
	    	}
	    }
	return parse
}
