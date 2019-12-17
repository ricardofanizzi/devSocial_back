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

const insertExtraInfo = ({ country, city, language, phone, id }) => {
  return new Promise((res, rej) => {
    db.query('UPDATE user_profile SET country = ?, city= ?, language = ?, phone = ? WHERE fk_user = ?', [country, city, language, phone, id], (error, result) => {
      if (error) rej(error);
      res(result);
    });
  })
}

const insertAbout = ({ about, id }) => {
  return new Promise((res, rej) => {
    db.query('UPDATE user_profile SET about_me = ? WHERE fk_user = ?', [about, id], (error, result) => {
      if (error) rej(error)
      res(result);
    })
  })
}

const updateSkills = ({ availability, speciality, experience, id }) => {
  return new Promise((res, rej) => {
    db.query('UPDATE user_profile SET availability = ?, speciality = ?, experience = ? WHERE fk_user = ?', [availability, speciality, experience, id], (error, result) => {
      if (error) rej(error);
      res(result)
    })
  })
}




module.exports = {
  createUser: createUser,
  getDataUserTables: getDataUserTables,
  insertExtraInfo: insertExtraInfo,
  insertAbout: insertAbout,
  updateSkills: updateSkills,
};
