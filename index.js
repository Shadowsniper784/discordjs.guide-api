
function no(res, what) {
		res.format({
		'text/html': function() {
			res.send(`<h>No ${what} specified</h>`);
		}})
}

var express = require('express');
var app = express();
app.get('/api', (req, res, next) => {
	const run = require('./routes/search.js');
	run(req, res, no);
});
app.get('/', (req, res, next) => {
	res.redirect('/home');
});
app.get('/home', (req, res, next) => {
	res.format({
		'text/html': function() {
			res.send(
				'<h1>Welcome to home!</h1> \
<h2>Endpoints:</h2> \
			<p> \
/api?q=TEXT\
			</p>'
			);
		}
	});
});
app.all('*', function(req, res) {
	res.redirect('/home');
});
app.listen(3000, () => {
	console.log('Server running on port 3000');
});