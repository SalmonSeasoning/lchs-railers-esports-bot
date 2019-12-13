const mysql = require("mysql");
const utilities = require("./utilities.js");

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
const dbuser = process.env.DB_USER || "root";
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

//connects to mysql, Resolveolves with database connection if successful
//Rejectects with error if not successful
module.exports.connect = (db) => {
    //gettin all fancy with promises and stuff
    return new Promise((Resolve, Reject) => {
        db.connect(err => {
            if (err) Reject(err);
            else Resolve(db);
        });
    });
};

//checks to see if the bot's database actually exists, assumes default db name
//Resolveolves if mysql is connected
//Rejectects if database is not connected, or with other mysql errors
module.exports.doesDatabaseExist = (db) => {
    return new Promise((Resolve, Reject) => {
        if (db.state == "disconnected") Reject(new Error("MySQL database not connected."));
        else {
            db.query(`SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'railer-db'`, (err, Resolveult) => {
                if (err) Reject(err);
                else {
                    if (Resolveult.length > 0) Resolve(true);
                    else Resolve(false);
                }
            });
        }
    });
};

//gets user level from levels table
//Resolveolves with mysql Resolveults
//Rejectects with mysql errors
//ty made this
module.exports.getUserLevel = (db, uid) => {
  return new Promise((Resolveolve, Rejectect) => {
      if (db.state == "disconnected") Rejectect(new Error("MySQL database not connected."));
      else {
          db.query(`SELECT * FROM levels WHERE user_id='${uid}'`, (err, Resolve) => {
              if (err) Rejectect(err);
              else Resolveolve(Resolve);
          });
      }
  });
}

//sets user level in levels table
//Resolveolves with mysql Resolveults
//Rejectects with mysql errors
//ty made this
module.exports.setUserLevel = (db, uid, newXP) => {
  return new Promise((Resolveolve, Rejectect) => {
      if(db.state == "disconnected") Rejectect(new Error("MySQL database not connected."));
      else {
          db.query(`UPDATE levels SET xp='${newXP}' WHERE user_id='${uid}'`, (err, Resolve) => {
            if(err) Rejectect(err);
            Resolveolve(Resolve);
          });
      }
  });
}

//checks to see if the level table exists
//Resolveolves if mysql is connected
//Rejectects if database is not connected, or with other mysql errors
module.exports.doesLevelTableExist = (db) => {
    return new Promise((Resolve, Reject) => {
        if (db.state == "disconnected") Reject(new Error("MySQL database not connected."));
        else {
            db.query(`SHOW TABLES LIKE "levels"`, (err, Resolveult) => {
                if (err) Reject(err);
                else {
                    if (Resolveult.length > 0) Resolve(true);
                    else Resolve(false);
                }
            });
        }
    });
}

//checks to see if the admin table exists
//Resolveolves if mysql is connected
//Rejectects if database is not connected, or with other mysql errors
module.exports.doesAdminTableExist = (db) => {
    return new Promise((Resolve, Reject) => {
        if (db.state == "disconnected") Reject(new Error("MySQL database not connected."));
        else {
            db.query(`SHOW TABLES LIKE "admins"`, (err, Resolveult) => {
                if (err) Reject(err);
                else {
                    if (Resolveult.length > 0) Resolve(true);
                    else Resolve(false);
                }
            });
        }
    });
}

//gets data from the admins table
//Resolveolves with an array of admin ids, null if the table is empty
//Rejectects with mysql errors, or if the database is not connected
module.exports.getAdmins = (db) => {
    return new Promise((Resolve, Reject) => {
        if (db.state == "disconnected") Reject(new Error("MySQL database not connected."));
        else {
            db.query(`SELECT user_id FROM admins`, (err, Resolveult) => {
                if (err) Reject(err);
                else {
                    if (Resolveult.length > 0) Resolve(null);
                    else Resolve(Resolveult);
                }
            });
        }
    });
}

//adds a user to the admins table
//Resolveolves with nothing
//Rejectects with mysql errors, or if the database is not connected
module.exports.addAdmin = (db, admin_id) => {
    return new Promise((Resolve, Reject) => {
        if (db.state == "disconnected") Reject(new Error("MySQL database not connected."));
        else if (!utilities.TextIsValid(admin_id)) Reject(new Error("Admin ID invalid."));
        else {
            db.query(`INSERT INTO admins SET ?`, { user_id: admin_id }, (err, Resolveult) => {
                if (err) Reject(err);
                else Resolve();
            });
        }
    });
};

//checks to see if a user is an admin, returns a boolean
//made by ty but formatted to look like my code lol
module.exports.isUserAdmin = (db, user_id) => {
    let isAdmin = false;
    module.exports.getAdmins(db).then((admins) => {
        if (admins != null && admins.includes(user_id)) isAdmin = true;
        return isAdmin;
    }).catch(console.error);
};

//Get metadata from a certain user
//added new mysql table named cosmetic.sql
module.exports.getUserMetadata = (db, user_id) => {
    return new Promise((Resolve, Reject) => {
        if (db.state == "disconnected")
            Reject(new Error("MySQL database not connected."));
        else {
            db.query(`SELECT metadata FROM cosmetic WHERE user_id=${user_id}`, (err, Resolveult) => {
                if (err) Reject(err);
                else Resolve(Resolveult);
            });
        }
    });
}

//sets the metadata for a user. Resolveolves either true or false. true being that it successfully set the new metadata, false it failed.
module.exports.setUserMetadata = (db, user_id, metadata) => {
    return new Promise((Resolve, Reject) => {
         if (db.state == "disconnected")
             Reject(new Error("MySQL database not connected."));
        else {
            dq.query(`UPDATE cosmetic SET metadata='${metadata}' WHERE user_id='${user_id}'`, (err, Resolveult) => {
                if(err)
                    Reject(false);
                else {
                    Resolve(true);   
                }
            });
        }
    });
}

//checks to see if the cosmetic table exists
//Resolveolves if mysql is connected
//Rejectects if database is not connected, or with other mysql errors
module.exports.doesCosmeticTableExist = (db) => {
    return new Promise((Resolve, Reject) => {
        if (db.state == "disconnected") Reject(new Error("MySQL database not connected."));
        else {
            db.query(`SHOW TABLES LIKE "cosmetic"`, (err, Resolveult) => {
                if (err) Reject(err);
                else {
                    if (Resolveult.length > 0) Resolve(true);
                    else Resolve(false);
                }
            });
        }
    });
}
