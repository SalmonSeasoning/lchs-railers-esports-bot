const mysql = require("mysql");

/** 
 * If you change stuff around in the docker-compose file you better pass some environment variables.
 * Don't change anything if you're using docker-compose like you should be using.
 * 
 * DB_HOST = MySQL server. "mysql" is the default.
 * DB_USER = MySQL user. "root" is default.
 * DB_PASS = MySQL password. "railerbot" is default.
 * DB_NAME = The MySQL database that the bot will use. "railer-db" is default.
 */
const dbhost = process.env.DB_HOST || "mysql";
const dbuser = precess.env.DB_USER || "root";
const dbpass = process.env.DB_PASS || "railerbot";
const dbname = process.env.DB_NAME || "railer-db";

//i'm going to have a lot of these be promises because discord.js is based on promises

//i think this just sets the parameters to be used for when we actually connect later
module.exports.createConnection = () => {
    //connecting to mysql db, assuming defaults are left alone in the docker-compose
    return mysql.createConnection({ 
        host: dbhost,
        user: dbuser,
        password: dbpass,
        database: dbname,
        charset: "utf8mb4_bin",
        multipleStatements: true //remember to sanitize inputs
    });
};

//connects to mysql, resolves with database connection if successful
//rejects with error if not successful
module.exports.connect = (db) => {
    //gettin all fancy with promises and stuff
    return new Promise((res, rej) => {
        db.connect(err => {
            if (err) rej(err);
            else res(db);
        });
    });
};

//checks to see if the bot's database actually exists, assumes default db name
//resolves if mysql is connected
//rejects if database is not connected, or with other mysql errors
module.exports.doesDatabaseExist = (db) => {
    return new Promise((res, rej) => {
        if (db.state == "disconnected") rej(new Error("MySQL database not connected."));
        else {
            db.query(`SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'railer-db'`, (err, result) => {
                if (err) rej(err);
                else {
                    if (result.length > 0) res(true);
                    else res(false);
                }
            });
        }
    });
};

//checks to see if the level table exists
//resolves if mysql is connected
//rejects if database is not connected, or with other mysql errors
module.exports.doesLevelTableExist = (db) => {
    return new Promise((res, rej) => {
        if (db.state == "disconnected") rej(new Error("MySQL database not connected."));
        else {
            db.query(`SHOW TABLES LIKE "levels"`, (err, result) => {
                if (err) rej(err);
                else {
                    if (result.length > 0) res(true);
                    else res(false);
                }
            });
        }
    });
}

//checks to see if the admin table exists
//resolves if mysql is connected
//rejects if database is not connected, or with other mysql errors
module.exports.doesLevelTableExist = (db) => {
    return new Promise((res, rej) => {
        if (db.state == "disconnected") rej(new Error("MySQL database not connected."));
        else {
            db.query(`SHOW TABLES LIKE "admins"`, (err, result) => {
                if (err) rej(err);
                else {
                    if (result.length > 0) res(true);
                    else res(false);
                }
            });
        }
    });
}

//gets data from the admins table
//resolves with an array of admin ids, null if the table is empty
//rejects with mysql errors, or if the database is not connected
module.exports.getAdmins = (db) => {
    return new Promise((res, rej) => {
        if (db.state == "disconnected") rej(new Error("MySQL database not connected."));
        else {
            db.query(`SELECT user_id FROM admins`, (err, result) => {
                if (err) rej(err);
                else {
                    if (result.length > 0) res(null);
                    else res(result);
                }
            });
        }
    });
}