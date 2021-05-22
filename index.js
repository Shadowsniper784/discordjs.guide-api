var express = require('express');
var app = express();
app.get('/api', (req, res, next) => {
	const a = req.query.a || 2;
	const text = req.query.q;
	if (text) run(a);
	else no('q');
	function no(what) {
		return res.format({
			'text/html': function() {
				res.send(`<h>No ${what} specified</h>`);
			}
		});
	}
	function run(amount) {
	  	let r = [];
		const lext = text.toLowerCase();
		var docs = require('./guide.json');
		var result = docs.file.filter(function(item) {
			const title = item.title.toLowerCase();
			var e = item.children.find(it => {
				return it.toLowerCase().includes(lext);
			});
			return title.includes(lext) || lext.includes(title) || e;
		});
		r.push(result);
		r.length = amount;
		res.format({
			'application/json': function() {
				res.send(r);
			}
		});
	}
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
