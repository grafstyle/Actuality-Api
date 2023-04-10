"use strict"; // Using strict.

/**
 * Schema of posts.
 */
const PostSchema = {
  id: Number,
  id_user: Number,
  body: String,
  date_added: String,
  date_modiffied: String,
  cant_likes: Number,
};

export default PostSchema; // Exporting schema.