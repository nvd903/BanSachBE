const User = require("../model/userSchema");

class UserController {
  //[GET] /user/
  async getAllUser(req, res) {
    try {
      const users = await User.find();
      if (!users) {
        res.status(404).json("No account yet");
      }
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  //[GET] /user/:id
  async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        res.status(404).json("Account dose not exist");
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async update(req, res) {
    try {
      const newUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!newUser) {
        res.status(404).json("not found");
      }
      res.status(200).json(newUser);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  //[DELETE] /user/:id
  async deleteUserById(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        res.status(404).json("account does not exist");
      }
      res.status(200).json("Succesful delete");
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = new UserController();
