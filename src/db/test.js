const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

// magic string evasion
const urlBase = 'https://resources.allsetlearning.com'
const css_linkClass = '.mw-redirect' 
const css_sentClass = '.liji li'
const css_pyClass = '.pinyin'
const css_transClass = '.trans'
const outFileDir = './dataModels/'

let dataModel = []
let droppedModel = []

function parseListPage() {
axios.get(urlBase + '/chinese/grammar/HSK_1_grammar_points')
	.then(async response => {
		console.log("Beggining scrape...")	
		const $ = cheerio.load(response.data);
		const links = $('.mw-redirect')
		for (let i = 0; i < links.length; ++i) {
			const href = links[i].attribs.href;
			const pageData = await parsePage(href)
			dataModel = [...dataModel, ...pageData]
			console.log("Analyzing page: " + i + "/" + links.length)
		}
		writeFile(dataModel, 'HSK1.json')
	}).catch(function (resp) { console.log("error" + resp) });
}

function writeFile(data, fileName) {
	console.log("Writing " + data.length + " sentences...")
	fs.writeFileSync(outFileDir + fileName, JSON.stringify(data))
	if (droppedModel.length != 0) {
		fs.writeFileSync(outFileDir + 'dropped.json', JSON.stringify(droppedModel))
	}
	console.log("Dropped: " + droppedModel.length)
}

// parses whole allset learning grammar page
const parsePage = async href => {
    let res = await axios.get(urlBase + href)
	const $ = cheerio.load(res.data);
	const sents = $('.liju ul:not(.dialog) li:not(.x, .q)')
	const pinyin = sents.children('.pinyin').remove()
	const trans = sents.children('.trans').remove()
	var parse = []
	    for (let i = 0; i < sents.length; ++i) {
			const zh = $(sents[i]).text()
			const py = $(pinyin[i]).text()
			const eng = $(trans[i]).text()
			if (zh != "" && eng != "") {
				parse.push({zh,py,eng})
			} else {
				droppedModel.push({href,zh,py,eng})
			}
	    }
	return parse
}

async function main() {
	const mode = process.argv[2]
	const href = process.argv[3]
	if (mode == "--single" && href != undefined) {
		const data = await parsePage(href)
		writeFile(data, 'test.json')	
	} else if (mode == "--full"){
		parseListPage();
	} else {
		console.log("Please specify either of the following:\n --single [URL]\n --full")
	}
}
main()
