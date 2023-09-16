import {
  getPostsService,
  getPostService,
  addPostService,
  updatePostService,
  deletePostService,
} from "../service/postService.js";

export const getPosts = async (req, res) => {
  try {
    let results = await getPostsService(req, res);
    return res.status(200).json(results);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const getPost = async (req, res) => {
  try {
    let results = await getPostService(req, res);
    return res.status(200).json(results[0]);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

export const addPost = async (req, res) => {
  try {
    let results = await addPostService(req, res);
    return res.status(200).json(results);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

export const deletePost = async (req, res) => {
  try {
    let results = await deletePostService(req, res);
    return res.status(200).json(results[0]);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

export const updatePost = async (req, res) => {
  try {
    let results = await updatePostService(req, res);
    return res.status(200).json(results);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};
