import bcrypt from "bcryptjs";
import { createUser, checkExistingUser } from "../service/userService.js";
import { tokenGenerate } from "../utils/jwtToken.js";

export const register = async (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  req.body.password = bcrypt.hashSync(req.body.password, salt);
  try {
    let results = await createUser(req, res);
    return res.status(200).json({
      success: 1,
      code: results,
      data: req.body,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: 0,
      message: "An error occured: " + err,
    });
  }
};

/* user Login */

export const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !req.body.password) {
    return res.status(422).json({ message: "fill all the details" });
  }

  try {
    const existingUser = await checkExistingUser(username);
    if (!existingUser[0][0]) {
      return res.status(400).json({ message: "User not found. Signup Please" });
    }
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      existingUser[0][0].password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Inavlid Email / Password" });
    }
    // token generate
    const token = tokenGenerate(
      existingUser[0][0].id,
      process.env.JWT_ACCESS_SECRET_KEY,
      200000
    );
    const { password, ...other } = existingUser[0][0];
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: 0,
      message: "An error occured: " + err,
    });
  }
};

/* logout */
export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out.");
};
