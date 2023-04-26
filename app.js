// All imports.
import { App, Router } from "./src/API.js";
import {
  addUser,
  deleteUser,
  getUsers,
  updateUser,
} from "./controller/Users.js";
import {
  addPost,
  deletePost,
  getPosts,
  updatePost,
} from "./controller/Posts.js";
import {
  addComment,
  deleteComment,
  getComments,
  updateComment,
} from "./controller/Comments.js";
import {
  addLike,
  deleteLike,
  getLikes,
  updateLike,
} from "./controller/Likes.js";
import * as url from "url";

const app = new App();
const router = new Router();
const appURL = "http://localhost:4200";

/**
 * All data of users.
 */
let allDataUsers = await getUsers();

/**
 * All data of posts.
 */
let allDataPosts = await getPosts();

/**
 * All data of comments.
 */
let allDataComments = await getComments();

/**
 * All data of likes.
 */
let allDataLikes = await getLikes();

// Adding the url's of update, get and delete one in one of users.
allDataUsers.forEach((elem) => {
  Object.keys(elem).forEach((key) => {
    if (key == "id") {
      let withIdUrl = "/users/" + elem["id"];
      router.get(withIdUrl, elem);
      router.update(withIdUrl, elem["id"], updateUser);
      router.delete(withIdUrl, elem["id"], deleteUser);
    }
  });
});

// Adding the url's of update, get and delete one in one of posts.
allDataPosts.forEach((elem) => {
  Object.keys(elem).forEach((key) => {
    if (key == "id") {
      let withIdUrl = "/posts/" + elem["id"];
      router.get(withIdUrl, elem);
      router.update(withIdUrl, elem["id"], updatePost);
      router.delete(withIdUrl, elem["id"], deletePost);
    }
  });
});

// Adding the url's of update, get and delete one in one of comments.
allDataComments.forEach((elem) => {
  Object.keys(elem).forEach((key) => {
    if (key == "id") {
      let withIdUrl = "/comments/" + elem["id"];
      router.get(withIdUrl, elem);
      router.update(withIdUrl, elem["id"], updateComment);
      router.delete(withIdUrl, elem["id"], deleteComment);
    }
  });
});

// Adding the url's of update, get and delete one in one of likes.
allDataLikes.forEach((elem) => {
  Object.keys(elem).forEach((key) => {
    if (key == "id") {
      let withIdUrl = "/likes/" + elem["id"];
      router.get(withIdUrl, elem);
      router.update(withIdUrl, elem["id"], updateLike);
      router.delete(withIdUrl, elem["id"], deleteLike);
    }
  });
});

// Adding the url's of get and post of users.
router.get("/users", allDataUsers);
router.post("/users", addUser);
router.getByParams("/users/get", getUsers);

// Adding the url's of get and post of posts.
router.get("/posts", allDataPosts);
router.post("/posts", addPost);
router.getByParams("/posts/get", getPosts);

// Adding the url's of get and post of comments.
router.get("/comments", allDataComments);
router.post("/comments", addComment);
router.getByParams("/comments/get", getComments);

// Adding the url's of get and post of likes.
router.get("/likes", allDataLikes);
router.post("/likes", addLike);
router.getByParams("/likes/get", getLikes);
