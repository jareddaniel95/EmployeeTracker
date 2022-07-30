
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const tableOptions = [
    {
        type: 'list',
        name: 'choice',
        message: "Choose an option: ",
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'exit'],
        filter(val) {
            return val;
        }
    }
];

const newDeptOptions = [
    {
        type: 'input',
        name: 'name',
        message: "Enter department name: "
    }
];

const newRoleOptions = [
    {
        type: 'input',
        name: 'dept',
        message: "Enter department id: "
    },
    {
        type: 'input',
        name: 'title',
        message: "Enter role title: "
    },
    {
        type: 'input',
        name: 'salary',
        message: "Enter role salary: "
    }
];

const newEmployeeOptions = [
    {
        type: 'input',
        name: 'role',
        message: "Enter role id: "
    },
    {
        type: 'input',
        name: 'first_name',
        message: "Enter first name: "
    },
    {
        type: 'input',
        name: 'last_name',
        message: "Enter last name: "
    },
    {
        type: 'input',
        name: 'manager',
        message: "Enter manager id (leave blank for none): "
    }
];

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'ploy1916+++++',
      database: 'company'
    },
    console.log(`Connected to the company database.`)
  );

async function showDepartments() {
    db.query('SELECT * FROM department', function(err, results) {
        console.table(results);
    });
}

async function showRoles() {
    db.query('SELECT * FROM role', function(err, results) {
        console.table(results);
    });
}

async function showEmployees() {
    db.query('SELECT * FROM employee', function(err, results) {
        console.table(results);
    });
}

async function action(answers) {
    console.log();
    if(answers.choice == "view all departments") {
        await showDepartments();
    } else if(answers.choice == "view all roles") {
        showRoles();
    } else if(answers.choice == "view all employees") {
        showEmployees();
    } else if(answers.choice == "add a department") {
        await inquirer
            .prompt(newDeptOptions)
            .then(async (answers) => {
                db.query(`INSERT INTO department (d_name) VALUES("${answers.name}")`, async function(err, results) {
                    err ? console.log("Invalid entry") : await showDepartments();
                });
            })
            .catch((error) => {
                console.log(error);
        });
    } else if(answers.choice == "add a role") {
        await inquirer
            .prompt(newRoleOptions)
            .then(async (answers) => {
                db.query(`INSERT INTO role (title, salary, department_id) VALUES("${answers.title}", ${answers.salary}, ${answers.dept})`, async function(err, results) {
                    err ? console.log("Invalid entry") : await showRoles();
                });
            })
            .catch((error) => {
                console.log(error);
        });
    } else if(answers.choice == "add an employee") {
        await inquirer
            .prompt(newEmployeeOptions)
            .then(async (answers) => {
                db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
                            VALUES("${answers.first_name}", "${answers.last_name}", ${answers.role}, ${answers.manager})`, async function(err, results) {
                    err ? console.log("Invalid entry\n" + err) : await showEmployees();
                });
            })
            .catch((error) => {
                console.log(error);
        });
    } else if(answers.choice == "exit") {
        process.exit();
    }
    await sleep(500);
    prompt();
}

function sleep(time) {
    return new Promise((res) => {
        setTimeout(res, time);
    });
}

async function prompt() {
    inquirer
        .prompt(tableOptions)
        .then(async (answers) => {
            await action(answers);
        })
        .catch((error) => {
            console.log(error);
    });
}

prompt();