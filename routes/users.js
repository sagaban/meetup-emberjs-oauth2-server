var User = require('./../models').User;
var errors = require('./../errors');

module.exports.create = function(req, res, next) {
  var user = {
    email : req.body.email,
    password: req.body.password
  };
  User.register(user, function(err, user) {
    if (err) {
      console.log("Error creating user: ", err);
      return next(err);
    }
    res.send(user);
  });
};

module.exports.show = function(req, res, next) {
  User.findOne({ email: req.session.userId}, function(err, user) {
    if (err) return next(err);
    if (!user) return next(new errors.NotFound('User not found'));
    res.render('account', { user: user });
  });
};
