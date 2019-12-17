//insert de comentarios
const newComent = ({ coment, date, idUser, idTema }) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO COMENTS (coment,date,fk_user,fk_tema) VALUES (?,?,?,?)",
      [coment, new Date(), idUser, idTema],
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
      "SELECT * FROM COMENTS WHERE fk_tema = ? order by date desc",
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
