const moment = require('moment');
/* Obtener todos los usuarios */
const getAll = () => {
    return new Promise((resolve, reject)=>{
        db.query('SELECT * FROM users', (err, rows)=>{
            if(err) reject(err)
            rows.map(row => {
                row = dateFormatAll(row)
            })
            resolve(rows);
        });
    });
};

/* Obtener todos los usuarios activos o inactivos */
const getAllActive = (pActive) => {
    return new Promise((resolve, reject) =>{
        db.query('SELECT * FROM users WHERE isActive = ?', [pActive], (err, rows)=>{
            if(err) reject(err)
            rows.map(row => {
                row = dateFormatAll(row)
            })
            resolve(rows);
        });
    });
};


/* Obtener usuarios por su ID */
const getById = (pId) => {
    return new Promise((resolve, reject)=>{
        db.query('SELECT * FROM users WHERE id = ?', [pId], (err, rows) => {
            if(err) reject(err)
            rows[0] = dateFormatAll(rows[0])
            resolve(rows[0])
        });
    });
};




/* Funciones */

//Formato por fecha para datos
let dateFormat = (pDate, pOptionalFormat = 'DD-MM-YYYY') => {
   return pDate = (pDate != null) ? moment(pDate).format(pOptionalFormat): ''
}

//Formato por fecha para objetos
let dateFormatAll = (pRow) =>{
    pRow.endAt = dateFormat(pRow.endAt);
    pRow.startAt = dateFormat(pRow.startAt);
    pRow.eulaDate = dateFormat(pRow.eulaDate);
    pRow.updateAt = dateFormat(pRow.updateAt ,'DD-MM-YYYY HH:MM:ss') 
    return pRow
}

/* Final de funciones */

module.exports = {
    getAll : getAll,
    getById : getById,
    getAllActive: getAllActive
}