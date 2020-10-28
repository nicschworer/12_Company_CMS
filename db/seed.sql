USE newcompany_db;
-- Departments Data
INSERT INTO departments (id, name) VALUES 
(10, "HR"),
(11, "Sales"),
(12, "Engineering"),
(13, "Accounting");

-- Roles Data
INSERT INTO roles (id, title, salary, department_id) VALUES 
(100, "Administrative Assistant", 45000, 10),
(101, "Recruiter", 62000, 10),
(104, "Sales Person", 70000, 11),
(105, "Client Partner", 80000, 11),
(106, "Engineer", 90000, 12),
(108, "Accountant", 60000, 13),
(202, "HR Business Partner", 80000, 10),
(203, "Sales Manager", 80000, 11),
(207, "Engineering Manager", 100000, 12),
(209, "Finance Manager", 80000, 13 );

-- Employees Data
INSERT INTO employees (id, first_name, last_name, role_id, manager_id, department_id) VALUES
( 1001, 'Harry', 'Potter', 207, NULL, 12 ),
( 1002, 'Ron', 'Weasley', 203, NULL, 11 ),
( 1003, 'Hermione', 'Granger', 209, NULL, 13 ),
( 1004, 'Neville', 'Longbottom', 202, NULL, 10 ),
( 1005, 'Dean', 'Thomas', 101, 1004, 10 ),
( 1006, 'Luna', 'Lovegood', 101, 1004, 10 ),
( 1007, 'Draco', 'Malfoy', 104, 1002, 11 ),
( 1008, 'Lucious', 'Malfoy', 104, 1002, 11 ),
( 1009, 'Ginny', 'Weasley', 105, 1002, 11 ),
( 1010, 'Fred', 'Weasley', 105, 1002, 11 ),
( 1011, 'George', 'Weasley', 105, 1002, 11 ),
( 1012, 'James', 'Potter', 108, 1003, 13 ),
( 1013, 'Lily', 'Potter', 108, 1003, 13 ),
( 1014, 'Albus', 'Dumbledore', 106, 1001, 12 ),
( 1015, 'Severus', 'Snape', 106, 1001, 12 ),
( 1016, 'Minerva', 'McGonagle', 106, 1001, 12 ),
( 1017, 'Salazar', 'Slytherin', 105, 1002, 11 ),
( 1018, 'Godrick', 'Gryffindor', 105, 1002, 11 ),
( 1019, 'Tom', 'Riddle', 100, 1004, 10 ),
( 1020, 'Cedrick', 'Diggory', 202, 1024, 10 ),
( 1021, 'Vernon', 'Dursley', 100, 1003, 10 ),
( 1022, 'Petunia', 'Dursley', 100, 1002, 10 ),
( 1023, 'Dudley', 'Dursley', 100, 1001, 10 ),
( 1024, 'Sirius', 'Black', 202, NULL, 10 );
