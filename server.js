const { Pool } = require('pg');
const inquirer = require ('inquirer');
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
    switch (data.action) {
      case "View All Employees":
        employee.viewEmployees();
        start();
        break;
      case "View Employees By Manager":
        employeesByManager();
        break;
      case "View All Roles":
        role.printRoles();
        start();
        break;
      case "View All Departments":
        department.printDepartments();
        start();
        break;
      case "Add Employee":
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