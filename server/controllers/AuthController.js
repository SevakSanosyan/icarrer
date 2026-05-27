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
      phone,
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

      phone,

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

        email: user.email,

        role: user.role,

        phone: user.phone,

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

    console.log(user); 
    console.log(user.role);

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

        email: user.email,

        role: user.role,

      },

    });

  } catch (error) {

    res.status(500).json({

      message:
      error.message,

    });

  }
};

const forgotPassword =
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

      return res.status(404).json({

        message:
        "User not found",

      });
    }

    const hashedPassword =
    await bcrypt.hash(
      password,
      10
    );

    user.password =
    hashedPassword;

    await user.save();

    res.json({

      message:
      "Password updated",

    });

  } catch (error) {

    res.status(500).json({

      message:
      "Server Error",

    });

  }
};

const getUsers =
require("../models/User");

async (req, res) => {

  try {

    const users =
    await User.find()
    .select(
      "email phone"
    );

    res.json(users);

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
  forgotPassword,
  getUsers,
};