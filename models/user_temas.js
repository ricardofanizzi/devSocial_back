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

//Get Project by users.
const getTemaByUser = ({ userId }) => {
  console.log(userId)
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

const getUserInTema = ({ userId }) => {
  console.log(userId)
  //todos los temas que tengan ese userId
  return new Promise((resolve, reject) => {
    db.query("SELECT temas.* FROM tbi_tema_user INNER JOIN temas ON temas.id = tbi_tema_user.id_tema WHERE tbi_tema_user.id_user = ?", [userId], (err, rows) => {
      console.log(rows)
      if (err) reject(err);
      resolve(rows);
    })
  })
}

module.exports = {
  insert: insert,
  getTemaByUser: getTemaByUser,
  checkUser: checkUser,
  getUserInTema: getUserInTema
};
