module.exports = function (req, res, next) {
  // checks if client sent a cookie
  var cookie = req.cookies.CarlEnderCookieNr;
  if (cookie === undefined)
  {
    // no: set a new cookie
    var randomNumber=Math.random().toString();
    randomNumber=randomNumber.substring(2,randomNumber.length);
    res.cookie('CarlEnderCookieNr',randomNumber, { maxAge: 900000, httpOnly: true });
    console.log('cookie created successfully');
  } 
  else
  {
    // yes, cookie was already present 
    console.log('cookie exists', cookie);
  } 
  next(); // <-- important! -> continue with express.static('public')
};