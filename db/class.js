// // create class for DB with all methods and export class

// const { table } = require("console");
// const { builtinModules } = require("module");
let connection = require("./connection");
const inquirer = require("inquirer");
const index = require("../index");

const roles = [];


class DB {
    constructor(connection) {
        this.connection = connection;
    }

    getAllEE() {
        connection.query(
            "SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments on roles.department_id = departments.id LEFT JOIN employees manager on manager.id = employees.manager_id;", function(err, results) {
            if (err) throw err;
            console.log("\n \n ");
            console.table(results);
            console.log("\n \n ");

            index.start();
        });
    };

    getEEbyRole () {
        let rolesArray = [];
        connection.query("SELECT * FROM roles", function(err, results) {
            if (err) {throw err;};
            for (let i = 0; i < results.length; i++) {
                rolesArray.push({
                    name: results[i].title,
                    value: results[i].id
                    });
                };
        inquirer.prompt({
            name: "role",
            type: "list",
            message: "Which roles would you like to see employees by?",
            choices: rolesArray
        }).then( function (response) {
            connection.query("SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments on roles.department_id = departments.id LEFT JOIN employees manager on manager.id = employees.manager_id WHERE roles.id = ?", [response.role], function(err, results) {
                if (err) throw err;
                console.log("\n \n ");
                console.table(results);
                console.log("\n \n ");
                index.start();
            });
        });
        });
    };

    getAddEE() {
        let rolesArray = [];
        let managersArray = [{name: "no manager", value: "NULL"}];
        let deptsArray = [];
        connection.query("SELECT * FROM departments", function(err, results) {
            if (err) {throw err;};
            for (let i = 0; i < results.length; i++) {
                deptsArray.push({
                    name: results[i].name,
                    value: results[i].id
                    });
                };
        connection.query("SELECT * FROM roles", function(err, results) {
            if (err) {throw err;};
            for (let i = 0; i < results.length; i++) {
                rolesArray.push({
                    name: results[i].title,
                    value: results[i].id
                    });
                };
        connection.query("SELECT id, CONCAT (first_name, ' ', last_name) AS name FROM employees", function(err, results) {
            if (err) {throw err;};
            for (let i = 0; i < results.length; i++) {
                managersArray.push({
                    name: results[i].name,
                    value: results[i].id
                    });
                };
        inquirer.prompt([
                {
                    name: "first_name",
                    type: "input",
                    message: "First Name?",
                }, {
                    name: "last_name",
                    type: "input",
                    message: "Last Name?",
                }, {
                    name: "role_id",
                    type: "list",
                    message: "What is their role?",
                    choices: rolesArray,
                }, {
                    name: "havemanager",
                    type: "confirm",
                    message: "Will they have a manager?",
                }, {
                    name: "manager_id",
                    type: "list",
                    message: "Who will their manager be?",
                    choices: managersArray,
                    when: function (answer) {return answer.havemanager === true}
                }, {
                    name: "department_id",
                    type: "list",
                    message: "In which department will they be?",
                    choices: deptsArray,
                }]      
            ).then(function (response) {
                //    console.log(response); 
                connection.query("INSERT INTO employees SET ?", {
                    first_name: response.first_name,
                    last_name: response.last_name,
                    role_id: response.role_id,
                    manager_id: response.manager_id,
                    department_id: response.department_id}, function(err, results) {
                    if (err) throw err;
                    console.log("\n Added " + response.first_name + " " + response.last_name + " to your employee database. \n")
                    index.start();
                });
                });
                });
            });
        });
    };

    getDeleteEE() {
        let EEArray = [];
        connection.query("SELECT id, CONCAT (first_name, ' ', last_name) AS name FROM employees", function(err, results) {
            if (err) {throw err;};
            for (let i = 0; i < results.length; i++) {
                EEArray.push({
                    name: results[i].name,
                    value: results[i].id
                    });
                };
        inquirer.prompt({
            message: "Which employee would you like to remove?",
            type: "list",
            name: "employee",
            choices: EEArray
        }).then(function(response) {
            connection.query("DELETE FROM employees WHERE id = ?", [response.employee], function(err, result) {
            if (err) {throw err;};
            console.log("\n That employee has been deleted. \n")
            index.start();
            })
        })
    });
    };

    getUpdateEE() {
        let EEArray = [];
        let rolesArray = [];
        let managersArray = [];
        connection.query("SELECT id, CONCAT (first_name, ' ', last_name) AS name FROM employees", function(err, results) {
            if (err) {throw err;};
            console.log(results);
            for (let i = 0; i < results.length; i++) {
                EEArray.push({
                    name: results[i].name,
                    value: results[i].id
                    });
                };    
            connection.query("SELECT * FROM roles", function(err, results) {
                if (err) {throw err;};
                for (let i = 0; i < results.length; i++) {
                    rolesArray.push({
                        name: results[i].title,
                        value: results[i].id
                        });
                    };
                connection.query("SELECT id, CONCAT (first_name, ' ', last_name) AS name FROM employees", function(err, results) {
                    if (err) {throw err;};
                    for (let i = 0; i < results.length; i++) {
                        managersArray.push({
                            name: results[i].name,
                            value: results[i].id
                            });
                        };
                inquirer.prompt([{
                    message: "Which employee would you like to update?",
                    type: "list",
                    name: "employee",
                    choices: EEArray
                }, {
                    message: "Do you want to update their role?",
                    type: "confirm",
                    name: "updaterole",
                }, {
                    message: "Do you want to update their manager?",
                    type: "confirm",
                    name: "updatemanager",
                }, {
                    message: "Who is their new manager?",
                    type: "list",
                    name: "manager_id",
                    choices: managersArray,
                    when: function (answers) {return answers.updatemanager === true}
                }, {
                    message: "What is their new role?",
                    type: "list",
                    name: "role_id",
                    choices: rolesArray,
                    when: function (answers) {return answers.updaterole === true}
                }
                ]).then(function(response) {
                    if (response.updatemanager) {
                        connection.query("UPDATE employees SET manager_id = ? WHERE id = ?", [response.manager_id, response.employee], function(err, result) {
                            if (err) {throw err;};})
                        };
                    if (response.updaterole) {
                        connection.query("UPDATE employees SET role_id = ? WHERE id = ?", [response.role_id, response.employee], function(err, result) {
                            if (err) {throw err;};
                        });
                    };
                    console.log("\n Your updates have been saved. \n")
                    index.start();
                });
            })
        })
    });
    };

    getAddRole() {
        let deptsArray = [];
        connection.query("SELECT * FROM departments", function(err, results) {
            if (err) {throw err;};
            for (let i = 0; i < results.length; i++) {
                deptsArray.push({
                    name: results[i].name,
                    value: results[i].id
                    });
                };
        inquirer.prompt([
                {
                    name: "title",
                    type: "input",
                    message: "What is the new role?",
                }, {
                    name: "salary",
                    type: "number",
                    message: "What is the role salary? (input without $ or , )",
                }, {
                    name: "department_id",
                    type: "list",
                    message: "In which department is it?",
                    choices: deptsArray
                }]      
            ).then(function (response) {
                //    console.log(response); 
                connection.query("INSERT INTO roles SET ?", {
                    title: response.title,
                    salary: response.salary,
                    department_id: response.department_id}, function(err, results) {
                    if (err) throw err;
                });
                console.log("\n Added " + response.title + " to your roles database. \n")
                index.start();
                });
            });
    };

    getUpdateRoleSalary() {
        let rolesArray = [];
        let deptsArray = [];
        connection.query("SELECT * FROM roles", function(err, results) {
            if (err) {throw err;};
            for (let i = 0; i < results.length; i++) {
                rolesArray.push({
                    name: results[i].title,
                    value: results[i].id
                    });
                };
        connection.query("SELECT * FROM departments", function(err, results) {
            if (err) {throw err;};
            for (let i = 0; i < results.length; i++) {
                deptsArray.push({
                    name: results[i].name,
                    value: results[i].id
                    });
                };
        inquirer.prompt([{
            message: "Which role would you like to update?",
            type: "list",
            name: "role",
            choices: rolesArray
        }, {
            message: "What is the new salary?",
            type: "number",
            name: "salary",
        }]).then(function(response) {
            connection.query("UPDATE roles SET salary = ? WHERE id = ?", [response.salary, response.role], function(err, result) {
                if (err) {throw err;};
            });
            console.log("\n That role's salary has been updated. \n")
            index.start();
            });
        });
        });
    };

    getDeleteRole() {
        let rolesArray = [];
        connection.query("SELECT * FROM roles", function(err, results) {
            if (err) {throw err;};
            for (let i = 0; i < results.length; i++) {
                rolesArray.push({
                    name: results[i].title,
                    value: results[i].id
                    });
                };
                inquirer.prompt([
                    {
                        name: "role",
                        type: "list",
                        message: "What role would you like to delete?",
                        choices: rolesArray
                    }]
                ).then(function (response) {
                    connection.query("DELETE FROM roles WHERE id = ?", [response.role], function(err, result) {
                        if (err) {throw err;};
                        console.log("\n The role has been deleted. \n")
                        index.start();
                        })
                    })
                });
    };

    getAddDept() {
        inquirer.prompt([
            {
                name: "name",
                type: "input",
                message: "What is the new department's name?",
            }]      
        ).then(function (response) {
            //    console.log(response); 
            connection.query("INSERT INTO departments SET ?", [{
                name: response.name,
                }], function(err, results) {
                if (err) throw err;
            });
            console.log("\n " + response.name + " has been added to your departments database. \n")
            index.start();
            });
    };

    getDeleteDept() {
        let deptsArray = [];
        connection.query("SELECT * FROM departments", function(err, results) {
            if (err) {throw err;};
            for (let i = 0; i < results.length; i++) {
                deptsArray.push({
                    name: results[i].name,
                    value: results[i].id
                    });
                };
                inquirer.prompt([
                    {
                        name: "department",
                        type: "list",
                        message: "Which department would you like to delete?",
                        choices: deptsArray
                    }]
                ).then(function (response) {
                    connection.query("DELETE FROM departments WHERE id = ?", [response.department], function(err, result) {
                        if (err) {throw err;};
                        console.log("\n The department has been deleted. \n")
                        index.start();
                        })
                    })
                });
    };

    getViewAllRoles() {
        connection.query("SELECT * FROM roles", function (err, results) {
            if (err) {throw err};
            console.log("\n \n ");
            console.table(results);
            console.log("\n \n ");

            index.start();
        })
    };

    getViewAllDepts() {
        connection.query("SELECT * FROM departments", function (err, results) {
            if (err) {throw err};
            console.log("\n \n ");
            console.table(results);
            console.log("\n \n ");

            index.start();
        })
    };

};

module.exports = new DB(connection);
