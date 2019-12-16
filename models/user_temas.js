const insert = ({ idTema, idUser, role }) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO tbi_tema_user SET id_tema = ?, id_user = ?, role = ?', [idTema, idUser, role], (err, result) => {
            if (err) reject(err)
            resolve(result)
        });
    });
}

const checkUser = ({ idUser, idTema }) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT tbi_tema_user.role FROM tbi_tema_user WHERE id_user = ? AND id_tema = ?', [idUser, idTema], (err, result) => {
            if (err) reject(err)
            resolve(result)
        });
    });
}


module.exports = {
    insert: insert,
    checkUser: checkUser
}