var http = require('http');

module.exports = function(jarvis, module) {

	module.addAction(module.createCommand({
		name: 'Down For Me',
		description: 'Check if a website is up or down using the http://isup.me/ service',
		example: "is google.com up?\nis this-site-is-never-up.com down?",
		match: /^is (.*?) (?:up|down)(?:\?)?$/i,
		func: function(message, domain) {
			var options = {
				host: 'www.isup.me',
				path: '/' + domain
			};
			http.get(options, function(res) {
				if (res.statusCode == 200) {
					var body = '';
					res.on('data', function(chunk) {
						body += chunk;
					}).on('end', function() {
						var reply = '';
						if (body.match('It\'s just you.')) {
							reply = domain + ' looks UP from here';
						}
						else if (body.match('Huh?')) {
							reply = domain + ' doesn\'t look like a domain';
						}
						else {
							reply = domain + ' looks DOWN from here';
						}
						jarvis.reply(message, reply);
					});
				}
			});
		}
	}));

};
