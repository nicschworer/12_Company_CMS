// create connection to SQL server and export connection

let mysql = require("mysql");
let util = require("util");

// create the connection information for the sql database
let connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "newcompany_db"
});

connection.connect();

connection.query = util.promisify(connection.query);


module.exports = connection;

