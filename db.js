const mysql = require('mysql');

const pool = mysql.createPool({
    host : '127.0.0.1',
    user: 'root',
    password: 'root',
    port: 8889,
    database: 'devsocial'
});

global.db = pool