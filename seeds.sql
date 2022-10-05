USE company;

INSERT INTO department (d_name)
VALUES ("Red Dept"),
       ("Blue Dept"),
       ("Green Dept"),
       ("Purple Dept");

INSERT INTO role (title, salary, department_id)
VALUES ("Role 1", 70000.00, 001),
       ("Role 2", 75000.00, 001),
       ("Role 3", 85000.00, 002),
       ("Role 4", 85000.00, 002),
       ("Role 5", 90000.00, 002),
       ("Role 6", 95000.00, 003),
       ("Role 7", 105000.00, 003),
       ("Role 8", 120000.00, 004);
       
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Zuri", "Arellano", 008, NULL),
       ("Conor", "Cordova", 007, 1),
       ("Chance", "Chapman", 006, 2),
       ("Martin", "Bennett", 006, 2),
       ("Makenzie", "Gilbert", 005, 4),
       ("Jackeline", "Osborne", 004, 3),
       ("Melissa", "Watts", 003, 3),
       ("Nathan", "Kemp", 002, 5),
       ("Cameryn", "Hahn", 002, 6),
       ("Katrina", "Marshall", 002, 6),
       ("Bob", "Wagner", 001, 5),
       ("Cara", "Foster", 001, 7),
       ("Trenten", "Pineda", 001, 7)