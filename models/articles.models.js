const db = require("../db/connection");

exports.selectArticleById = (id) => {
  return db
    .query(
      `SELECT articles.*, COUNT(comments.article_id) AS comment_count FROM articles LEFT JOIN 
comments ON articles.article_id = comments.article_id WHERE articles.article_id = ${id} GROUP BY articles.article_id;`
    )
    .then(({ rows }) => {
      if (rows[0] === undefined) {
        return Promise.reject({ status: 404, msg: "Article not found!" });
      }
      return rows[0];
    });
};

exports.updateArticleById = (inc_votes, id) => {
  if (inc_votes === undefined) {
    return Promise.reject({
      status: 400,
      msg: "Bad request, missing information!",
    });
  } else if (typeof inc_votes !== "number") {
    return Promise.reject({
      status: 400,
      msg: "Bad request, incorrect type!",
    });
  }

  return db
    .query(
      `UPDATE articles SET votes = ${inc_votes} + votes WHERE article_id = ${id} RETURNING *`
    )
    .then(({ rows }) => {
      if (rows[0] === undefined) {
        return Promise.reject({ status: 404, msg: "Article not found!" });
      }
      return rows[0];
    });
};
