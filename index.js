
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
]

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

async function action(answers) {
    if(answers.choice == "view all departments") {
        await showDepartments();
    } else if(answers.choice == "view all roles") {
        db.query('SELECT * FROM role', function(err, results) {
            console.table(results);
        });
    } else if(answers.choice == "view all employees") {
        db.query('SELECT * FROM employee', function(err, results) {
            console.table(results);
        });
    } else if(answers.choice == "add a department") {
        await inquirer
            .prompt(newDeptOptions)
            .then(async (answers) => {
                db.query(`INSERT INTO department (d_name) VALUES("${answers.name}")`, async function(err, results) {
                    await showDepartments();
                });
            })
            .catch((error) => {
                console.log(error);
        });
    } else if(answers.choice == "exit") {
        process.exit();
    }
    await sleep(1000);
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