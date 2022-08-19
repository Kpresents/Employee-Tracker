//connect packages, sql and PORT 
const inquirer = require('inquirer');
const mysql = require('mysql2');
const express = require('express');
const { response } = require('express');
const { deepStrictEqual } = require('assert');
const { allowedNodeEnvironmentFlags } = require('process');
const PORT = process.env.PORT || 3001;
const app = express();
require ("console.table");

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
db.connect(()=>{
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
     .then(response=>{
         if (response.options==="View All Departments"){
             viewDepartment()

         }
         if (response.options === "View ALl Roles"){
             viewRoles()
         }
         if (response.options=== "View All Employees"){
             viewEmployees()
         }
         if (response.options === "ADD a Department"){
             addDepartment()
         }
         if (response.options === "ADD a Role"){
             addRole()
         }
         if (response.options === "ADD an Employee"){
             addEmployee()
         }
         if (response.options=== "Update Employee"){
             updateEmployee()
         }
     });
};

function viewDepartment (){
 db.query("SELECT * FROM department", (err, data)=>{
     console.table(data);
     startMenu();
 });
};

function viewRoles (){
    db.query ("SELECT * FROM role", (err, data)=>{
        console.table(data);
        startMenu();
    });
};
function viewEmployees(){
    db.query ("SELECT * FROM employee", (err, data)=>{
        console.table(data);
        startMenu();
    });
};

function addDepartment(){
    inquirer.prompt([
        {
            type: "input",
            name: "departmentName",
            message: "What is the name of the new Department?"
        }
    ])
    .then (response=>{
        db.query("INSERT INTO department (name) VALUES (?)", [response.departmentName], (err, data)=>{
            viewDepartment();
        });
    });
}



function addRole(){
    inquirer.prompt([
        {
            type: "input",
            name: 'title', 
            message: "What is the new role?"
        },
        {
            type:  "input", 
            name: "salary",
            message: "What is the salary?"
        },
        {
            type: "list",
            name: "department_id",
            message: "What is the department for this Role?",
            choices: [
                "Admin",
                "Engineering",
                "Support"
            ],
           
        },
    ])
    .then (response=>{
        db.query("INSERT INTO role(title, salary, department_id) VALUES (?,?,?)", [response.title, response.salary, response.department_id], (err, data)=>{
            viewRoles();
        } );
    })
};
function addEmployee(){
    inquirer.prompt([
        {
            type: "input",
            name: 'first_name', 
            message: "What is the employees first name?"
        },
        {
            type:  "input", 
            name: "last_name",
            message: "What is the employees last name?"
        },
        {
            type: "list",
            name: "role_id",
            message: "What is the employees role?",
            choices: [
                "Project Manager",
                "Systems",
                "Development",
                "Admin"
            ],
        }
    ])
    .then (response=>{
        db.query("INSERT INTO employee (first_name, last_name, role_id) VALUES (?,?,?)", [response.first_name, response.last_name, response.role_id], (err, data)=>{
            viewEmployees();
        } );
    })
};
//what about the manager?


function updateEmployee(){
    inquirer.prompt([
         {
            type: "list", 
        
            message: "Which employee would you like to update?",
            choices: viewEmployees 

        },
        {
            type:  "list", 
            message: "What is the employees new role?",
            choices: viewRoles

        },
      
    ])
    .then (response=>{
        // db.query("UPDATE employee SET role = ? WHERE employee = ?", [response.viewEmployees, response.viewRoles], (err, data)=>{
            startMenu();
        } );
    })
}

app.listen(PORT, ()=>{
console.log (`You are connected to ${PORT}`);
});