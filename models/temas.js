
// Obtener  todos los temas
const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM temas order by fecha_inicio desc', (err, rows) => {
            if (err) reject(err)
            resolve(rows)
        });
    })
}
// Obtener temas by id
const getById = (pId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * from temas where id = ?', [pId], (err, rows) => {
            if (err) reject(err);
            if (rows.length == 1) {
                resolve(rows[0]);
            } else {
                reject('Tema no encontrado');
            }
        })
    })
}
// Insertar tema
const insert = ({ name, isPublic, descripcion, imgUrl, especializacion, fecha_inicio, updateAt }) => {
    return new Promise((resolve, reject) => {
        let especialidades = especializacion.toString();
        db.query('INSERT INTO temas (name, isPublic, descripcion, imgUrl, especializacion, fecha_inicio,updateAt) VALUES (?, ?, ?, ?, ?,?,?)', [name, 1, descripcion, imgUrl, especialidades, new Date(), new Date()], (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

/* Actualización de temas */
const update = ({ name, isPublic, isActive, descripcion, imgUrl, id }) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE temas SET nombre = ?, isPublic = ?, isActive = ?, descripcion = ?, imgUrl = ? WHERE id = ?', [name, isPublic, isActive, descripcion, imgUrl, id], (err, result) => {
            if (err) reject(err)
            resolve(result)
        });
    });
};


/* Eliminacion de tema */

const deleted = (pId) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM temas WHERE id = ?', [pId], (err, rows) => {
            if (err) reject(err)
            resolve(rows)
        })
    })
}

const getAllAndTbi = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT temas.*, tbi_tema_user.id_user FROM tbi_tema_user INNER JOIN temas ON temas.id = tbi_tema_user.id_tema', (err, rows) => {
            if (err) reject(err)
            resolve(rows)
        })
    })
}






module.exports = {
    getAll: getAll,
    getById: getById,
    insert: insert,
    update: update,
    deleted: deleted,
    getAllAndTbi: getAllAndTbi

}


