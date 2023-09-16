import { connection } from "../db.js";

export const getPostsService = async (req, res) => {
  const q = req.query.cat
    ? "SELECT * FROM posts WHERE cat=?"
    : "SELECT * FROM posts";
  try {
    const queryResult = await connection.query(q, [req.query.cat]);
    return queryResult[0];
  } catch (error) {
    console.error("addUserDetails, an error occurred:", error);
    throw error;
  }
};

export const getPostService = async (req, res) => {
  const q =
    "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";
  try {
    const queryResult = await connection.query(q, [req.params.id]);
    return queryResult[0];
  } catch (error) {
    console.error("addUserDetails, an error occurred:", error);
    throw error;
  }
};

export const addPostService = async (req, res) => {
  const q =
    "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`,`uid`) VALUES (?,?,?,?,?,?)";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.img,
    req.body.cat,
    req.body.date,
    req.body.id,
  ];

  try {
    const queryResult = await connection.query(q, values);
    await connection.commit();
    return queryResult[0];
  } catch (error) {
    console.error("addUserDetails, an error occurred:", error);
    throw error;
  }
};

export const updatePostService = async (req, res) => {
  const q =
    "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? AND `uid` = ?";
  const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];
  try {
    const queryResult = await connection.query(q, [...values,req.params.id,req.body.id]);
    return queryResult[0];
  } catch (error) {
    console.error("addUserDetails, an error occurred:", error);
    throw error;
  }
};

export const deletePostService = async (req, res) => {
  const postId = req.params.id;
  const userId = req.body.id;
  const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";
  try {
    const queryResult = await connection.query(q, [postId, userId]);
    return queryResult[0];
  } catch (error) {
    console.error("addUserDetails, an error occurred:", error);
    throw error;
  }
};
