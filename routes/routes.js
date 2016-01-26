var sec = require('./securityfunc');

module.exports = function(app, passport) {

	require('./user.js')(app,passport);
	require('./task.js')(app,passport);
	require('./security.js')(app,passport);
	require('./content.js')(app,passport);



};
