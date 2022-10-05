DROP DATABASE IF EXISTS company;
CREATE DATABASE company;

USE company;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    d_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

Create TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id),
    PRIMARY KEY (id)
);

Create TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    FOREIGN KEY (role_id)
    REFERENCES role(id),
    manager_id INT NULL,
    FOREIGN KEY (manager_id)
    REFERENCES employee(id),
    PRIMARY KEY (id)
);