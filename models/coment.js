//insert de comentarios
const newComent = ({ coment, date, idUser, idTema, userName }) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO coments (coment,date,fk_user,fk_tema, user_name) VALUES (?,?,?,?,?)",
      [coment, new Date(), idUser, idTema, userName],
      (error, result) => {
        if (error) reject(error);
        resolve(result);
      }
    );
  });
};

const getComents = idTema => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM coments WHERE fk_tema = ? order by date desc",
      [idTema],
      (error, rows) => {
        if (error) reject(error);
        resolve(rows);
      }
    );
  });
};

module.exports = {
  newComent: newComent,
  getComents: getComents
};
