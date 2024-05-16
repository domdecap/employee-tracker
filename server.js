const { Pool } = require('pg');
const inquirer = require('inquirer');
// const express = require('express');

const PORT = process.env.PORT || 3001;
// const app = express();

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

const pool = new Pool(
    {
        user: 'postgres',
        password: 'password',
        host: 'localhost',
        database: 'employees_db'
    },
    console.log('Connected to employees_db')
)

pool.connect()
    .then(() => console.log('Connected to PostgreSQL database'))
    .catch(err => console.error('Error connecting to PostgreSQL database', err));


function startEmployeeTracker() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'mainQuestions',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]
        }
    ]).then((data) => {
        menuOptions(data);
    });

};

function menuOptions(data) {
    switch (data.mainQuestions) {
        case "View all employees":
            viewEmployees();
            // startEmployeeTracker();
            break;
        case "View Employees By Manager":
            employeesByManager();
            break;
        case "View all roles":
            printRoles();
            // startEmployeeTracker();
            break;
        case "View all departments":
            printDepartments();
            // startEmployeeTracker();
            break;
        case "Add an employee":
            addEmployee();
            break;
        case "Add Role":
            addRole();
            break;
        case "Add Department":
            addDepartment();
            break;
        case "Update Employee Role":
            updateEmployeeRole();
            break;
        case "Exit":
            console.log('Exiting employee tracker...');
            break;
        default:
            console.log('Invalid option');
            startEmployeeTracker();
            break;
    }
}

startEmployeeTracker();

function viewEmployees() {
    pool.query('SELECT * FROM employee').then(function ({ rows }) {
        console.table(rows); 
        startEmployeeTracker();
    })
}

function printRoles() {
    pool.query('SELECT * FROM role').then(function ({ rows }) {
        console.table(rows); 
        startEmployeeTracker();
    })
}

function printDepartments() {
    pool.query('SELECT * FROM department').then(function ({ rows }) {
        console.table(rows); 
        startEmployeeTracker();
    })
}

function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the first name of the employee you would like to add?',
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the last name of the employee you would like to add?'
        },
        {
            type: 'input',
            name: 'role',
            message: 'What is the role of the employee you would like to add?'
        },
        {
            type: 'input',
            name: 'manager',
            message: 'Who is their manager?'
        },
    ]).then(function (answers) {
        // console.log(answers)
        pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',[answers.firstName, answers.lastName, answers.role, answers.manager]).then(function({ rows }){
console.log("added employee")
startEmployeeTracker();
        })
    })
}