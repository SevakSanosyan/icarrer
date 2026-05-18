const User =
require("../models/User");

const bcrypt =
require("bcryptjs");

const jwt =
require("jsonwebtoken");

const register =
async (req, res) => {

  try {

    const {
      email,
      password,
    } = req.body;

    const existingUser =
      await User.findOne({
        email,
      });

    if (existingUser) {

      return res
      .status(400)
      .json({
        message:
        "Այս email-ը արդեն գոյություն ունի",
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const user =
      await User.create({

        email,

        password:
        hashedPassword,

      });

    const token =
      jwt.sign(

        {
          id: user._id,
        },

        process.env.JWT_SECRET,

        {
          expiresIn: "30d",
        }

      );

    res.json({

      token,

      user: {
        email:
        user.email,
      },

    });

  } catch (error) {

    res.status(500).json({
      message:
      error.message,
    });

  }
};

const login =
async (req, res) => {

  try {

    const {
      email,
      password,
    } = req.body;

    const user =
      await User.findOne({
        email,
      });

    if (!user) {

      return res
      .status(400)
      .json({
        message:
        "Սխալ email",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res
      .status(400)
      .json({
        message:
        "Սխալ գաղտնաբառ",
      });
    }

    const token =
      jwt.sign(

        {
          id: user._id,
        },

        process.env.JWT_SECRET,

        {
          expiresIn: "30d",
        }

      );

    res.json({

      token,

      user: {
        email:
        user.email,
      },

    });

  } catch (error) {

    res.status(500).json({
      message:
      error.message,
    });

  }
};

module.exports = {

  register,
  login,

};