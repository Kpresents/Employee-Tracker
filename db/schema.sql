DROP DATABASE IF EXISTS mgmt_db;
CREATE DATABASE mgmt_db;

USE mgmt_db;

CREATE TABLE department (
  department_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  department_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  role_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  FOREIGN KEY (role_id)
  REFERENCES department_id(id)
  ON DELETE CASCADE 
);

CREATE TABLE employee(
  employee_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT ,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL, 
  manager_id INT NOT NULL
  -- null if the employee has no manager 
  FOREIGN KEY (role_id)
  REFERENCES department_id(id)
  ON DELETE SET NULL
);