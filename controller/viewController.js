exports.getHome = async (req, res, next) => {
  res.render("index");
};

exports.login = async (req, res, next) => {
  res.render("login");
};

exports.signup = async (req, res, next) => {
    res.render("signup");
  };

  exports.quiz = async (req, res, next) => {
    res.render("quiz");
  };