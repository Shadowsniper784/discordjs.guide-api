const fs = require('fs');
module.exports = file => {
	fs.readFile(file, 'utf8', function readFileCallback(err, data) {
		if (err) {
			console.log(err);
		} else {
			const json = data.replace(/],/gi, ']')
			fs.writeFile(file, json, 'utf8', function(err) {
				if (err) throw err;
				console.log('complete');
			}); // write it back
		}
	});
};
