const mysql = require('mysql2');
const mig = require('mysql-migrations');

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: 'sql10.freemysqlhosting.net',
  user: 'sql10455938',
  password:'f4H7zPxCmR',
  database: 'sql10455938',
  port:'3306',
  waitForConnections: true,
  connectionLimit: 99,
  queueLimit: 0
});

mig.init(pool, __dirname + '/db',()=>{
  console.log("Migraciones realizadas");
});

const query = async function(sql,param= undefined){
  //console.log(sql);
  //console.log(param);
  if (param!=undefined)
    return await pool.promise().query(sql,param);
  else
  return await pool.promise().query(sql);
}

module.exports = query;
