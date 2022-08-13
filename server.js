//connect packages, sql and PORT 
const inquirer = require('inquirer');
const mysql = require('mysql2');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

//middleware 
app.use(express.urlencoded({ extended: false }));
app.user(express.json());


//Connect to server
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: "password",
        database: "mgmt_db",
    },
    console.log('Now using mgmt_db')
);
//anything else missing? 



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
     





}

