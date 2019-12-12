const moment = require("moment");

/* Obtener todos los usuarios */
const getAll = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users", (err, rows) => {
      if (err) reject(err);
      rows.map(row => {
        row = dateFormatAll(row);
      });
      resolve(rows);
    });
  });
};

/* Obtener todos los usuarios activos o inactivos */
const getAllActive = pActive => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM users WHERE isActive = ?",
      [pActive],
      (err, rows) => {
        if (err) reject(err);
        rows.map(row => {
          row = dateFormatAll(row);
        });
        resolve(rows);
      }
    );
  });
};

/* Obtener usuarios por su ID */
const getById = pId => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users WHERE id = ?", [pId], (err, rows) => {
      if (err) reject(err);
      rows[0] = dateFormatAll(rows[0]);
      resolve(rows[0]);
    });
  });
};

/* Obtener usuarios por su Email */
const getByEmail = pEmail => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users WHERE email = ?", [pEmail], (err, rows) => {
      console.log(rows);
      if (err) reject(err);
      if (rows[0]) rows[0] = dateFormatAll(rows[0]);
      resolve(rows[0]);
    });
  });
};

/* Registro de usuarios */
const insert = ({ email, username, password, name, surnames, imageUrl }) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO users ( email, username, password, name, surnames, imageUrl, isActive, startAt, updateAt) VALUES (?, ?, ?, ? ,? ,?, ?, ?, ? )",
      [
        email,
        username,
        password,
        name,
        surnames,
        imageUrl,
        true,
        new Date(),
        new Date()
      ],
      (err, result) => {
        if (err) reject(err);
        if (result) {
          resolve(result);
        }
      }
    );
  });
};

/* Actualización de usuarios */
const updateNames = ({ id, username, name, surnames }) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE users SET username = ?, name = ?, surnames = ? WHERE id = ?",
      [username, name, surnames, id],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

const updateEmail = ({ id, email }) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE users SET email = ? WHERE id = ?",
      [email, id],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

const updatePassword = ({ id, password }) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE users  SET password = ? WHERE id = ?",
      [password, id],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

/* Funciones */

//Formato por fecha para datos
let dateFormat = (pDate, pOptionalFormat = "DD-MM-YYYY") => {
  return (pDate = pDate != null ? moment(pDate).format(pOptionalFormat) : "");
};

//Formato por fecha para objetos
let dateFormatAll = pRow => {
  console.log(pRow);
  pRow.endAt = dateFormat(pRow.endAt);
  pRow.startAt = dateFormat(pRow.startAt);
  pRow.eulaDate = dateFormat(pRow.eulaDate);
  pRow.updateAt = dateFormat(pRow.updateAt, "DD-MM-YYYY HH:MM:ss");
  return pRow;
};

/* Final de funciones */

module.exports = {
  getAll: getAll,
  getById: getById,
  getByEmail: getByEmail,
  getAllActive: getAllActive,
  insert: insert,
  updateNames: updateNames,
  updateEmail: updateEmail,
  updatePassword: updatePassword
};
