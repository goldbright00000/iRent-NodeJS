const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'vps.myirent.com',
    user: 'dev_user',
    database: 'irent_beta',
    password: 'iRentDev123!'
});

module.exports = pool.promise();