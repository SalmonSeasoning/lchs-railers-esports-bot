// necessary includes
const { Database } = require("./classes/database");
const { ternaryIf, readIfExistsSync } = require("./utils.js");
const FS = require("fs");

console.info("DirectBot3.0 Running SQL Setup");

// define database
var g_database = null;

// load config
const g_fsConfig = readIfExistsSync("./config.json", "UTF-8");
const g_Config = g_fsConfig ? JSON.parse(g_fsConfig) : () => {
    console.error("Could not load config.json! Cannot start..");
    process.exit(0);
};
if (g_Config["database"]) {

    // configure database
    let dbData = ["localhost", "root", "password", "database"];
    dbData[0] = ternaryIf(g_Config["database"]["host"], dbData[0]);
    dbData[1] = ternaryIf(g_Config["database"]["username"], dbData[1]);
    dbData[2] = ternaryIf(g_Config["database"]["password"], dbData[2]);
    dbData[3] = ternaryIf(g_Config["database"]["database"], dbData[3]);
    g_database = new Database(...dbData);

    console.log(`Interpreted database connection to be : { ${dbData[0]}, ${dbData[1]}, ${dbData[3]} }`);
    console.info("NOTICE: Unhandled promise rejections exceptions are from the MySQL module! Please disregard them for now...");

    // connect to database
    g_database.connect().then(() => {
        // connected
        console.log("Successfully connected to the database!");
        g_database.query(`USE ${g_database.dbname}`);

        // loop through ./src/sql for each .sql extension
        FS.readdirSync("./src/sql").forEach(fileName => {
            if (fileName.substring(fileName.length, fileName.length - 4) === ".sql") {
                console.log(`Found SQL file: ${fileName}`);
                g_database.query(readIfExistsSync(`./src/sql/${fileName}`)).then(
                    ()=>{
                        console.log(`Successfully executed ${fileName}`);
                    },
                    ()=>{
                        console.error(`Failed to execute ${fileName}`)
                    }
                );
            }
        });

        // force-end
        console.log("DONE!");
        process.exit(0);

    }, (err) => {
        // failed to connect
        console.warn("Could not to connect to the database!");
        console.warn(err);
    });
}
