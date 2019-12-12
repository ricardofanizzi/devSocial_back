const insert = ({ idTema, idUser, role }) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO tbi_tema_user SET id_tema = ?, id_user = ?, role = ?', [idTema, idUser, role], (err, result) => {
            if (err) reject(err)
            resolve(result)
        });
    });
}


module.exports = {
    insert: insert
}