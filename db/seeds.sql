INSERT INTO department (name)
VALUES ('Admin'),
       ('Engineering'),
       ('Support');
       
      

INSERT INTO role (title, salary, department_id)
VALUES ("Project Manager", 150000, 3),
       ("Systems", 160000, 2),
       ("Development", 170000, 1),
       ("Admin", 100000, 1);



INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Carolina","Hernandez", 1),
       ("Tom" , "Franklin", 2),
       ("David", "Matinez",3),
       ("Mark", "Moreno", 4);


      
UPDATE employee SET manager_id = 1 where id= 2;
UPDATE employee SET manager_id = 1 where id= 3;
UPDATE employee SET manager_id= 1 where id = 4; 