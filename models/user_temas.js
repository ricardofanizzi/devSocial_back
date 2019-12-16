const insert = ({ idTema, idUser, role }) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO tbi_tema_user SET id_tema = ?, id_user = ?, role = ?",
      [idTema, idUser, role],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

const getTemaByUser = ({ pUserId }) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT temas.* FROM tbi_tema_user INNER JOIN temas ON temas.id = tbi_tema_user.id_tema INNER JOIN users ON users.id = tbi_tema_user.id_user WHERE users.id = pUserId"
    ),
      [pUserId],
      (err, rows) => {
        if (err) reject(err);
        resolver(rows);
      };
  });
};

module.exports = {
  insert: insert,
  getTemaByUser: getTemaByUser
};
