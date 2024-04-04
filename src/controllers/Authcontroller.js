const User = require("../model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, isadmin: user.isadmin },
    process.env.JWT_ACCESS_KEY,
    { expiresIn: "365d" }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id, isadmin: user.isadmin },
    process.env.JWT_REFRESH_KEY,
    { expiresIn: "365d" }
  );
};

class Auth {
  //[POST] /register
  async register(req, res) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      // create a new user
      const newUser = await new User({
        username: req.body.username,
        password: hashPassword,
        email: req.body.email,
      });
      //save on db
      const user = await newUser.save();
      return res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //[POST] /auth/login
  async login(req, res) {
    try {
      console.log('a');
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        console.log('b');
        return res.status(404).json("Wrong username!");
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        console.log('c');
        return res.status(404).json("Wrong password!");
      }
      if (user && validPassword) {
        console.log('d');
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        console.log('e');
        const { password, ...others } = user._doc;
        return res.status(200).json({ ...others, accessToken });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async requestRefreshToken(req, res) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json("You're not authencated");
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        return res.status(403).json("token is not valid");
      }
      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);
      return res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      // return res.status(200).json(newAccessToken);
    });
  }

  //[Post] /logout
  async userLogout(req, res) {
    res.clearCookie("refreshToken");
    res.status(200).json("Logout");
  }
}

module.exports = new Auth();
