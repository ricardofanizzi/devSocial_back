

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

const getUsersByTema = ({ temaId }) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT users.*, tbi_tema_user.id as tbiId, temas.id as temaId FROM tbi_tema_user INNER JOIN temas ON temas.id = tbi_tema_user.id_tema INNER JOIN users ON users.id = tbi_tema_user.id_user WHERE temas.id = ?",
      [temaId],
      (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
  });
}

const getTemaByUser = ({ userId }) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT temas.* FROM tbi_tema_user INNER JOIN temas ON temas.id = tbi_tema_user.id_tema INNER JOIN users ON users.id = tbi_tema_user.id_user WHERE users.id = ?",
      [userId],
      (err, rows) => {
        if (err) reject(err);
        console.log(rows);
        resolve(rows);
      });
  });
};


const checkUser = ({ idUser, idTema }) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT tbi_tema_user.role FROM tbi_tema_user WHERE id_user = ? AND id_tema = ?",
      [idUser, idTema],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

const deleteById = ({ tbiId }) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM tbi_tema_user WHERE id = ?", [tbiId], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

module.exports = {
  insert: insert,
  getTemaByUser: getTemaByUser,
  getUsersByTema: getUsersByTema,
  checkUser: checkUser,
  deleteById: deleteById
};
