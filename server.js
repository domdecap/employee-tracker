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
        case "Add a role":
            addRole();
            break;
        case "Add a department":
            addDepartment();
            break;
        case "Update an employee role":
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
    const query = `
        SELECT 
            e.id,
            e.first_name AS "First Name",
            e.last_name AS "Last Name",
            r.title AS "Role",
            CONCAT(m.first_name, ' ', m.last_name) AS "Manager"
        FROM 
            employee e
        LEFT JOIN 
            role r ON e.role_id = r.id
        LEFT JOIN 
            employee m ON e.manager_id = m.id
    `;

    pool.query(query).then(function ({ rows }) {
        console.table(rows);
        startEmployeeTracker();
    }).catch(err => {
        console.error('Error executing query', err);
        startEmployeeTracker();
    });
}

function printRoles() {
    const query = `
        SELECT 
            r.id,
            r.title AS "Title",
            r.salary AS "Salary",
            d.dpt_name AS "Department"
        FROM 
            role r
        LEFT JOIN 
            department d ON r.department_id = d.id
    `;

    pool.query(query).then(function ({ rows }) {
        console.table(rows);
        startEmployeeTracker();
    }).catch(err => {
        console.error('Error executing query', err);
        startEmployeeTracker();
    });
}

function printDepartments() {
    pool.query('SELECT * FROM department').then(function ({ rows }) {
        console.table(rows);
        startEmployeeTracker();
    })
}


function addEmployee() {
    // Fetch roles and employees from the database
    Promise.all([
        pool.query('SELECT id, title FROM role'),
        pool.query('SELECT id, CONCAT(first_name, \' \', last_name) AS name FROM employee')
    ])
    .then(([roleResults, employeeResults]) => {
        const roles = roleResults.rows;
        const employees = employeeResults.rows;

        // Map the roles and employees to the format required by inquirer
        const roleChoices = roles.map(role => ({ name: role.title, value: role.id }));
        const employeeChoices = employees.map(employee => ({ name: employee.name, value: employee.id }));
        
        // Add a "None" option for the manager
        employeeChoices.unshift({ name: 'None', value: null });

        // Prompt the user for the new employee details
        return inquirer.prompt([
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
                type: 'list',
                name: 'role',
                message: 'What is the role of the employee you would like to add?',
                choices: roleChoices
            },
            {
                type: 'list',
                name: 'manager',
                message: 'Who is their manager?',
                choices: employeeChoices
            },
        ]);
    })
    .then(answers => {
        // Insert the new employee into the database
        return pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', 
                          [answers.firstName, answers.lastName, answers.role, answers.manager]);
    })
    .then(() => {
        console.log("Added employee");
        startEmployeeTracker();
    })
    .catch(err => {
        console.error('Error executing query', err);
        startEmployeeTracker();
    });
}

function addRole() {
    // Fetch departments from the database
    pool.query('SELECT id, dpt_name FROM department')
    .then(departmentResults => {
        const departments = departmentResults.rows;

        // Map the departments to the format required by inquirer
        const departmentChoices = departments.map(department => ({ name: department.dpt_name, value: department.id }));

        // Prompt the user for the new role details
        return inquirer.prompt([
            {
                type: 'input',
                name: 'roleName',
                message: 'What is the name of the role you would like to add?',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary for the role?',
                validate: function(value) {
                    const valid = !isNaN(parseFloat(value)) && isFinite(value);
                    return valid || 'Please enter a valid number';
                },
                filter: Number
            },
            {
                type: 'list',
                name: 'department',
                message: 'Which department does the role belong to?',
                choices: departmentChoices
            },
        ]);
    })
    .then(answers => {
        // Insert the new role into the database
        return pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', 
                          [answers.roleName, answers.salary, answers.department]);
    })
    .then(() => {
        console.log("Added new role");
        startEmployeeTracker();
    })
    .catch(err => {
        console.error('Error executing query', err);
        startEmployeeTracker();
    });
}

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'What is the name of the department you would like to add?',
        }
    ])
    .then(answers => {
        // Insert the new department into the database
        return pool.query('INSERT INTO department (dpt_name) VALUES ($1)', [answers.departmentName]);
    })
    .then(() => {
        console.log("Added new department");
        startEmployeeTracker();
    })
    .catch(err => {
        console.error('Error executing query', err);
        startEmployeeTracker();
    });
}
function updateEmployeeRole() {
    // Fetch employees and roles from the database
    Promise.all([
        pool.query('SELECT id, CONCAT(first_name, \' \', last_name) AS name FROM employee'),
        pool.query('SELECT id, title FROM role')
    ])
    .then(([employeeResults, roleResults]) => {
        const employees = employeeResults.rows;
        const roles = roleResults.rows;

        // Map the employees and roles to the format required by inquirer
        const employeeChoices = employees.map(employee => ({ name: employee.name, value: employee.id }));
        const roleChoices = roles.map(role => ({ name: role.title, value: role.id }));

        // Prompt the user to select an employee and their new role
        return inquirer.prompt([
            {
                type: 'list',
                name: 'employeeId',
                message: 'Which employee\'s role do you want to update?',
                choices: employeeChoices
            },
            {
                type: 'list',
                name: 'roleId',
                message: 'What is the employee\'s new role?',
                choices: roleChoices
            }
        ]);
    })
    .then(answers => {
        // Update the employee's role in the database
        return pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', 
                          [answers.roleId, answers.employeeId]);
    })
    .then(() => {
        console.log("Updated employee's role");
        startEmployeeTracker();
    })
    .catch(err => {
        console.error('Error executing query', err);
        startEmployeeTracker();
    });
}



