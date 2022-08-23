//connect packages, sql and PORT 
const inquirer = require('inquirer');
const mysql = require('mysql2');
const express = require('express');
const { response } = require('express');
const { deepStrictEqual } = require('assert');
const { allowedNodeEnvironmentFlags } = require('process');
const PORT = process.env.PORT || 3001;
const app = express();
require("console.table");

//Connect to server
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: "Askforit1129",
        database: "mgmt_db"
    },
    console.log('Now using mgmt_db')
);
//anything else missing? 
db.connect(() => {
    startMenu();
});


//Prompts:

const startMenu = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'Select an option:',
            choices: [
                'View All Departments',
                'View ALl Roles',
                'View All Employees',
                'ADD a Department',
                'ADD a Role',
                'ADD an Employee',
                'Update Employee',
                'COMPLETED'],
        }

    ])
        .then(response => {
            if (response.options === "View All Departments") {
                viewDepartment()

            }
            if (response.options === "View ALl Roles") {
                viewRoles()
            }
            if (response.options === "View All Employees") {
                viewEmployees()
            }
            if (response.options === "ADD a Department") {
                addDepartment()
            }
            if (response.options === "ADD a Role") {
                addRole()
            }
            if (response.options === "ADD an Employee") {
                addEmployee()
            }
            if (response.options === "Update Employee") {
                updateEmployee()
            }
            if (response.options === "COMPLETED"){
                console.log('Update Completed')
                process.exit(0)
            }
        });
};

function viewDepartment() {
    db.query("SELECT * FROM department", (err, data) => {
        console.table(data);
        startMenu();
    });
};

function viewRoles() {
    db.query("SELECT * FROM role", (err, data) => {
        console.table(data);
        startMenu();
    });
};
function viewEmployees() {
    db.query("SELECT * FROM employee", (err, data) => {
        console.table(data);
        startMenu();
    });
};

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "departmentName",
            message: "What is the name of the new Department?"
        }
    ])
        .then(response => {
            db.query("INSERT INTO department (name) VALUES (?)", [response.departmentName], (err, data) => {
                viewDepartment();
            });
        });
}



function addRole() {
    db.query('select name as name, id as value from department', (err, data) => {


        inquirer.prompt([
            {
                type: "input",
                name: 'title',
                message: "What is the new role?"
            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary?"
            },
            {
                type: "list",
                name: "department_id",
                message: "What is the department for this Role?",
                choices: data,

            },
        ])
            .then(response => {
                const statement = db.query("INSERT INTO role(title, salary, department_id) VALUES (?,?,?)", [response.title, response.salary, response.department_id], (err, data) => {
                    viewRoles();
                });
                console.log(statement.sql)
            })
    })
};
function addEmployee() {
    db.query('select title as name, id as value from role', (err, roledata) => {
        db.query('select concat(first_name, " ", last_name  ) as name, id as value from employee ', (err, employeedata) => {



            inquirer.prompt([
                {
                    type: "input",
                    name: 'first_name',
                    message: "What is the employees first name?"
                },
                {
                    type: "input",
                    name: "last_name",
                    message: "What is the employees last name?"
                },
                {
                    type: "list",
                    name: "role_id",
                    message: "What is the employees role?",
                    choices: roledata,
                },
                {
                    type: "list",
                    name: "manager_id",
                    message: "Who is the Manager for this Employee?",
                    choices: employeedata,
                }
            ])
                .then(response => {
                    db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)", [response.first_name, response.last_name, response.role_id, response.manager_id], (err, data) => {
                        viewEmployees();
                    });
                })
        })
    })
};



function updateEmployee() {
    db.query('select concat(first_name, " ", last_name) as name, id as value from employee', (err, employeedata)=>{
        db.query('select title as name, id as value from role', (err, roledata)=>{

        

    
    inquirer.prompt([
        {
            type: "list",
            message: "Which employee would you like to update?",
            name: 'employee_id',
            choices: employeedata

        },
        {
            type: "list",
            message: "What is the employees new role?",
            name: 'role_id',
            choices: roledata

        },

    ])
        .then(response => {
        
            db.query("UPDATE employee SET role_id = ? WHERE id = ?", [response.role_id, response.employee_id], (err, data) => {
                viewEmployees();
            });
        })
    })
})
}

app.listen(PORT, () => {
    console.log(`You are connected to ${PORT}`);
});