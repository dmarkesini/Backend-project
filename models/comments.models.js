const db = require("../db/connection");

exports.removeCommentById = (id) => {
  if (id === undefined) {
    return Promise.reject({
      status: 400,
      msg: "Bad request, invalid id!",
    });
  }
  return db
    .query(`SELECT * FROM comments WHERE comment_id = ${id}`)
    .then(({ rows }) => {
      console.log(rows[0]);
      if (rows[0] === undefined) {
        return Promise.reject({ status: 400, msg: "Comment not found!" });
      }
      return db
        .query(`DELETE FROM comments WHERE comment_id = ${id} RETURNING *`)
        .then(({ rows }) => {
          if (rows[0] === undefined) {
            return Promise.reject({ status: 404, msg: "Comment not found!" });
          }
          return rows[0];
        });
    });
};
