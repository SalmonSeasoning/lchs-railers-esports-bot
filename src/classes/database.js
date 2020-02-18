const mysql = require('mysql');

class Database { 
    constructor(host, user, passwd, dbname)
    {
        // create a new mysql connection
        this.connection = mysql.createConnection({
            host: host,
            user: user,
            password: passwd,
            multipleStatements: true
        });
        // this is the database we will use
        this.dbname = dbname;
    }
    connect()
    {
        // attempt to connect
        return new Promise((res, rej)=>{
            this.connection.connect((err)=>{
                if(err) rej(err.message);
                res();
            });
        });
    }
    query(sql)
    {
        // send a sql query
        return new Promise((res, rej)=>{
            this.connection.query(sql, (err, result, fields)=>{
                if(err) rej(err.message);
                res(result, fields);
            });
        });
    }
    get connected()
    {
        // g_database.connected -- will return true or false depending on connection
        return !(this.connection.state === "disconnected");
    }
}
module.exports = {
    Database: Database
};