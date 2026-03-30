/*!
 * Mui Grunt task for namespace generation
 */

/* jshint node: true */'use strict';
const fs = require('fs');
module.exports = function generateNamespace() {
	const dir = fs.readdirSync('dist/js/');
	dir.forEach(function(file) {
		if (~file.indexOf('.js') && !~file.indexOf('.min')) {
			let source = fs.readFileSync('dist/js/' + file, 'utf8');
			const name = file.replace('.js', '').split('.')[0];
			source = source.toString().replace(/\$\.className\(([\'|"])([^\'|"]*)[\'|"]\)/g, '$1' + name + '-$2$1').replace(/\$\.classSelector\(([\'|"])([^\'|"]*)[\'|"]\)/g, function(match, p1, p2) {
				return p1 + p2.replace(/\./g, '.' + name + '-') + p1;
			});
			fs.writeFileSync('dist/js/' + file, source);
		}
	});
};
