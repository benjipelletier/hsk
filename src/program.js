const fs = require('fs')
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let raw = fs.readFileSync('HSK1.json')
let dataModel = JSON.parse(raw)

function ask() {
	let i = Math.floor(Math.random()*dataModel.length)
    console.log(dataModel[i].engl)
	rl.question("", function(answer) {
		console.log("Your answer: " + answer)
		console.log("Correct    : " + dataModel[i].zh)
		rl.close()
		ask();
	})
}
ask()
