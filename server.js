var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var objectAssign = require('object-assign');
var jsave = require('jsave');
var exchangeEndpoint = 'http://apilayer.net/api/live?access_key=3ee63dc026b36372bcf91cd099eedca4';
// http://apilayer.net/api/list?access_key=3ee63dc026b36372bcf91cd099eedca4
// http://apilayer.net/api/live?access_key=3ee63dc026b36372bcf91cd099eedca4

var data = jsave.load('./data.json');
var app = express();
app.use(express.static(__dirname + '/public')).use(bodyParser.json());

app.get('/api/data', (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.json(data);
	console.log('Provide currency data');
});

// Update the quotes
app.get('/api/data/update-quotes', (req, res) => {

	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET');
	res.header('Access-Control-Allow-Headers', 'Content-Type');

	var reqEndpoint = http.get(exchangeEndpoint, (r) => {
		console.log('Request updated quotes');

		// Build the data
		var body = '';
		r.on('data', (chunk) => {
			body += chunk;
		});

		// Save and return it
		r.on('end', () => {
			var fetchedData = JSON.parse(body);
			var newData = {}

			newData.updated = fetchedData.timestamp,
			newData.source = fetchedData.source,
			newData.quotes = {}
			for ( var quote in fetchedData.quotes) {
				var newSymbol = quote.replace(fetchedData.source, '');
				var makeVisible = (data.quotes && data.quotes[newSymbol] && data.quotes[newSymbol].isVisible) ||  false;
				if (makeVisible) {
					console.log('Make ' + newSymbol + ' visible upon update');
				}
				newData.quotes[newSymbol] = {
					symbol: newSymbol,
					quote: fetchedData.quotes[quote],
					isVisible: makeVisible,
				};
			}

			// Save and return the data
			jsave(newData).to('./data.json');
			newData.save();
			data = newData;
			res.json(data);
		});
	});

	reqEndpoint.end();
});

// Toggle a currency as active or inactive
app.post('/api/data/toggle-currency', (req, res) => {
	console.log('Toggle currency ' + req.body.symbol + ' to ' + req.body.isVisible ? 'active' : 'inactive');

	var newQuotes = {};
	for ( var key in data.quotes) {
		var quote = data.quotes[key];
		newQuotes[key] = {
			symbol: quote.symbol,
			quote: quote.quote,
			isVisible: quote.symbol === req.body.symbol ? req.body.isVisible : quote.isVisible,
		};
	};

	var newData = objectAssign({}, data, {quotes: newQuotes});
	jsave(newData).to('./data.json');
	newData.save();
	data = newData;
	res.send(data);
});

app.get('*', (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.sendFile(__dirname + '/public/index.html')
});

app.listen(3333);
