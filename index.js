const inquirer = require("inquirer");
// const { ftruncate } = require("fs");
// const { allowedNodeEnvironmentFlags } = require("process");
// const { getDefaultSettings } = require("http2");
const db = require("./db/class");
const connection = require("./db/connection");
// const { randomBytes } = require("crypto");
const util = require('util');
    
    // function which prompts the user for what action they should take
async function start() {
    inquirer
        .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: ["view all employees", "view all roles", "view all departments", "view employees by role", "add a new employee", "delete an employee", "update an employee role or manager", "add a new role", "update a role salary", "delete a role", "add a department", "delete a department"]
        })
        .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.action === "view all employees") {
            db.getAllEE();
        } else if (answer.action === "view employees by role") {
            db.getEEbyRole();
        } else if (answer.action === "add a new employee") {
            db.getAddEE();
        } else if (answer.action === "delete an employee") {
            db.getDeleteEE(); 
        } else if (answer.action === "update an employee role or manager") {
            db.getUpdateEE();
        } else if (answer.action === "add a new role") {
            db.getAddRole();
        } else if (answer.action === "update a role salary") {
            db.getUpdateRoleSalary();
        } else if (answer.action === "delete a role") {
            db.getDeleteRole();
        } else if (answer.action === "add a department") {
            db.getAddDept();
        } else if (answer.action === "delete a department") {
            db.getDeleteDept();
        } else if (answer.action === "view all roles") {
            db.getViewAllRoles();
        } else if (answer.action === "view all departments") {
            db.getViewAllDepts();
    };
    });
};

// function getAllEE() {
//     connection.query(
//         "SELECT employees.first_name, employees.last_name, roles.title, roles.salary FROM company_DB.employees INNER JOIN company_DB.roles ON employees.role_id=roles.id;", function(err, results) {
//         if (err) throw err;
//         console.table(results);
//         start();
//     });
// };

start();

// const restart = start();

exports.start = start;































