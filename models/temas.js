
// Obtener  todos los temas
const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM temas', (err, rows) => {
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
const insert = ({ nombre, isPublic, descripcion, imgUrl, especializacion }) => {
    return new Promise((resolve, reject) => {

        db.query('INSERT INTO temas (nombre, isPublic, descripcion, imgUrl, especializacion) VALUES (?, ?, ?, ?, ?)', [nombre, isPublic, descripcion, imgUrl, especializacion], (err, result) => {
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






module.exports = {
    getAll: getAll,
    getById: getById,
    insert: insert,
    update: update,
    deleted: deleted

}


