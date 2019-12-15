const insert = ({ idTema, idUser, state }) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO subscription ( id_tema, id_user, state ) VALUES (?,?,?)', [idTema, idUser, state], (err, result) => {
            if (err) reject(err)
            resolve(result)
        });
    });
}

const getByTemaState = ({ idTema, state }) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT users.id, users.username, subscription.id as idSub FROM subscription INNER JOIN temas ON temas.id = subscription.id_tema INNER JOIN users ON users.id = subscription.id_user WHERE temas.id = ? AND subscription.state = ?', [idTema, state], (err, result) => {
            if (err) reject(err)
            resolve(result)
        });
    });
}


const updateState = ({ stateEdit, idSubscription }) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE subscription SET state = ? WHERE id = ?', [stateEdit, idSubscription], (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    });
}

module.exports = {
    insert: insert,
    getByTemaState: getByTemaState,
    updateState: updateState
}