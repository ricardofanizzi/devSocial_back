
// Obtener  todos los temas
const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM temas', (err, rows) => {
            if (err) reject(err)
            resolve(rows)
        });
    })
}

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
// MIRAR ESTO   
const insert = ({ nombre, isPublic, descripcion, imgUrl, especializacion }) => {
    return new Promise((resolve, reject) => {

        db.query('INSERT INTO temas (nombre, isPublic, descripcion, imgUrl, especializacion) VALUES (?, ?, ?, ?, ?)', [nombre, isPublic, descripcion, imgUrl, especializacion], (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}


// Crear fundion para  traer activos
module.exports = {
    getAll: getAll,
    getById: getById
}


