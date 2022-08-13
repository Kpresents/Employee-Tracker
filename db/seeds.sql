INSERT INTO department (department_name)
VALUES ('Admin'),
       ('Engineering'),
       ('Support');
       
      

INSERT INTO role (title, salary, department_id)
VALUES ("Project Manager", 150000, 3),
       ("Systems", 160000, 2),
       ("Development", 170000, 1),
       ("Admin", 100000, 1);



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Carolina","Hernandez", 1, 2 ),
       ("Tom" , "Franklin", 2, 3),
       ("David", "Matinez",3, 1),
       ("Mark", "Moreno", 4, 2);


      

       