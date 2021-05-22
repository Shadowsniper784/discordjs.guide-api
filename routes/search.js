module.exports = (req, res, no) => {
	const a = req.query.a || req.query.amount || 2;
	const text = req.query.q || req.query.search;
	let r = [];
	if (text) run(a);
	else no('q');

	function run(amount) {
		const lext = text.toLowerCase();
		var docs = require('../storage/guide.json');
		var result = docs.file.filter(function(item) {
			const title = item.title.toLowerCase();
			var e = item.children.find(it => {
				return it.toLowerCase().includes(lext);
			});
			return title.includes(lext) || lext.includes(title) || e;
		});
		r = result;
		r.length = amount;
		res.format({
		  'application/json': function() {
			res.send(r[0] ? r : 'No result found')
		}})
	}
};
