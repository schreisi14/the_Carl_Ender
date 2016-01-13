//Login-Strategy

//TODO: Implement a useful Strategy

var LocalStrategy = require('passport-local').Strategy;

module.exports = new LocalStrategy(
  function(username, password, done) {
    console.log("DEBUG:: User:" + username + ":: Pass:" + password);

    if (username == password){
      return done(null,{id: 1, username: 'heli'});
    } else {
      return done(null, false, {message: 'Incorret User/Pass'});
    }
});
