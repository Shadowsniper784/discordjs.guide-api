var express = require('express');
var app = express();
app.get('/api', (req, res, next) => {
	const path = require('path');
	const fs = require('fs');
	const text = req.query.q;
	let r = [];
	const lext = text.toLowerCase();
	const run = (docs, page) => {
		var result = docs.file.filter(function(item) {
			const title = item.title.toLowerCase();
			var e = item.children.find(it => {
				return it.toLowerCase().includes(lext);
			});
			return title.includes(lext) || lext.includes(title) || e;
		});
		r.push(result);
		return r;
	};
	r = run(require('./guide.json'), 1);
	res.format({
		'application/json': function() {
			res.send(r);
		}
	});
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
