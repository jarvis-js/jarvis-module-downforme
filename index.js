var http = require('http');

module.exports = function(bot) {

	var module = new bot.Module();

	module.load = function() {
		bot.registerCommand(module.name, /^is (.*?) (?:up|down)(?:\?)?$/i, function(request, domain) {
			var options = {
				host: 'www.isup.me',
				path: '/' + domain
			}
			http.get(options, function(res) {
				if (res.statusCode == 200) {
					var body = '';
					res.on('data', function(chunk) {
						body += chunk;
					}).on('end', function() {
						if (body.match('It\'s just you.')) {
							request.reply = domain + ' looks UP from here';
						}
						else if (body.match('Huh?')) {
							request.reply = domain + ' doesn\'t look like a domain';
						}
						else {
							request.reply = domain + ' looks DOWN from here';
						}
						bot.respond(request);
					});
				}
			});
		});
	};

	return module;
};
