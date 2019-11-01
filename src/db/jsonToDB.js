const admin = require('firebase-admin');
let dataModel
if (process.argv[2] == "test") {
	console.log("Using test data...")
	dataModel = require('./dataModels/test.json');
} else {
	dataModel = require('./dataModels/HSK1.json');
}

let serviceAccount = require('./hsksentenceminer-c8911934cb4f.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

const col_levels = db.collection('levels')
const col_hsk1 = db.collection('levels/hsk/1')
const col_sentences = db.collection('sentences')

dataModel.forEach(data => {
	col_sentences.add(data).then(ref => {
		console.log("Adding sentence ref to hsk1")
		col_hsk1.doc(ref.id).set({})
	})
})
