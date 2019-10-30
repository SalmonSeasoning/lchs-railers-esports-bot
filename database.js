const mysql = require("mysql");

module.exports.createConnection = () => {
    //connecting to mysql db, assuming defaults are left alone in the docker-compose
    //i think this just sets the parameters to be used for when we actually connect later
    return mysql.createConnection({ 
        host: "mysql",
        user: "root",
        password: "railerbot",
        database: "railer-db",
        charset: "utf8mb4_bin"
    });
};

module.exports.connect = (db) => {
    //gettin all fancy with promises and stuff
    //connects to mysql, resolves with database connection if successful
    //rejects with error if not successful
    return new Promise((res, rej) => {
        db.connect(err => {
            if (err) rej(err);
            else res(db);
        });
    });
};