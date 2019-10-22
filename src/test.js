const axios = require('axios');
const cheerio = require('cheerio');
const base = 'https://resources.allsetlearning.com'
axios.get(base + '/chinese/grammar/HSK_1_grammar_points')
  .then(function (response) {
    // handle success
    const $ = cheerio.load(response.data);
    const href = $('.mw-redirect')[0].attribs.href;
    return axios.get(base + href);
  }).then(function (response) {
	const $ = cheerio.load(response.data);
        const sent = $('.trans').parent()
        var parse = []
        for (let i = 0; i < sent.length; ++i) {
	    parse[i] = {
		zh: 'sdf',
		py: sent[i].children[3].children[0].data,
		engl: sent[i].children[4].children[0].data
	    }
        }
	console.log(parse)
  })

