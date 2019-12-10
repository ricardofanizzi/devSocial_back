//Crear nuevo usuario
const createUser = ({ speciality, availability, experience }) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO user_profile (speciality,availability,experience) VALUES (?,?,?)', [speciality, availability, experience], (error, result) => {
            if (error) reject(error)
            resolve(result);
        })
    })
}


module.exports = {
    createUser: createUser,
}