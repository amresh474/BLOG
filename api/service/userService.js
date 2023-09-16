import { connection } from "../db.js";

export const createUser = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const existingUser = await checkExistingUser(email, username);
    if (existingUser[0].length > 0) {
      return res
        .status(400)
        .json({ message: "User already exists! Login Instead" });
    }
    const insertQuery =
      "INSERT INTO users(`username`,`email`,`password`) VALUES (?,?,?)";
    const queryResult = await connection.query(insertQuery, [
      username,
      email,
      password,
    ]);
    await connection.commit();
    console.log("addUserDetails, transaction committed.");
    return queryResult[0];
  } catch (error) {
    console.error("addUserDetails, an error occurred:", error);
    throw error;
  } finally {
    connection.release();
  }
};


export const checkExistingUser = async (email, username) => {
  //CHECK EXISTING USER
  const q = "SELECT * FROM users WHERE email = ? OR username = ?";

  const existingUser = await connection.query(q, [email, username]);

  return existingUser;
};
