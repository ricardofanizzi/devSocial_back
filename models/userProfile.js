//Crear nuevo usuario
const createUser = ({ speciality, availability, experience, fk_user }) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO user_profile (speciality,availability,experience, fk_user ) VALUES (?,?,?,?)",
      [speciality, availability, experience, fk_user],
      (error, result) => {
        if (error) reject(error);
        const userCreated = resolve(result);
        console.log(userCreated);
      }
    );
  });
};

const getDataUserTables = pUserId => {
  return new Promise((res, rej) => {
    db.query(
      "SELECT * FROM `users` LEFT JOIN `user_profile` ON users.id = user_profile.fk_user WHERE users.id = ?",
      [pUserId],
      (error, rows) => {
        if (error) rej(error);
        res(rows);
      }
    );
  });
};

module.exports = {
  createUser: createUser,
  getDataUserTables: getDataUserTables
};
