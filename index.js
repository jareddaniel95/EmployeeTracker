
const inquirer = require('inquirer');
const mysql = require('mysql2');

const questions = [
    {
        type: 'list',
        name: 'choice',
        message: "Choose an option: ",
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role'],
        filter(val) {
            return val;
        }
    }
];

function init() {
    inquirer
        .prompt(questions)
        .then((answers) => {
            console.log(answers);
        })
        .catch((error) => {
            console.log(error);
    });
}

init();